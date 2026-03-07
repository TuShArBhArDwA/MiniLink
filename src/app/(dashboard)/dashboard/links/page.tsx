'use client';

import { useState, useEffect } from 'react';
import {
    Plus,
    GripVertical,
    Trash2,
    ExternalLink,
    Loader2,
    Eye,
    EyeOff,
    Edit3,
    Check,
    X,
    FolderOpen,
    ArrowLeft,
    FolderMinus,
    ChevronDown,
    Link2
} from 'lucide-react';
import {
    DndContext,
    closestCenter,
    TouchSensor,
    MouseSensor,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import IconPicker, { getIconComponent } from '@/components/dashboard/icon-picker';

interface Link {
    id: string;
    title: string;
    url: string;
    icon: string | null;
    order: number;
    isActive: boolean;
    isFolder?: boolean;
    parentId?: string | null;
    children?: Link[];
    clicks: number;
}

export default function LinksPage() {
    const [links, setLinks] = useState<Link[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [addingType, setAddingType] = useState<'link' | 'folder'>('link');
    const [newLink, setNewLink] = useState({ title: '', url: '', icon: '' });
    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            const res = await fetch('/api/links');
            const data = await res.json();
            setLinks(data);
        } catch (error) {
            console.error('Failed to fetch links:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddLink = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLink.title) return;
        if (addingType === 'link' && !newLink.url) return;

        try {
            const res = await fetch('/api/links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newLink,
                    isFolder: addingType === 'folder',
                    parentId: selectedFolderId
                }),
            });

            if (res.ok) {
                fetchLinks(); // Refetch to get updated nested structure
                setNewLink({ title: '', url: '', icon: '' });
                setIsAdding(false);
            }
        } catch (error) {
            console.error('Failed to add link:', error);
        }
    };

    const handleDeleteLink = async (id: string) => {
        try {
            await fetch(`/api/links/${id}`, { method: 'DELETE' });
            fetchLinks(); // Refetch to ensure nested UI matches DB
        } catch (error) {
            console.error('Failed to delete link:', error);
        }
    };

    const handleToggleActive = async (id: string, isActive: boolean) => {
        try {
            await fetch(`/api/links/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive }),
            });
            fetchLinks();
        } catch (error) {
            console.error('Failed to toggle link:', error);
        }
    };

    const handleMoveLink = async (linkId: string, targetFolderId: string | null) => {
        try {
            await fetch(`/api/links/${linkId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parentId: targetFolderId }),
            });
            fetchLinks();
        } catch (error) {
            console.error('Failed to move link:', error);
        }
    };

    const currentLinks = selectedFolderId
        ? links.find(l => l.id === selectedFolderId)?.children || []
        : links;

    const availableLinks = selectedFolderId
        ? links.filter(l => !l.isFolder && l.id !== selectedFolderId)
        : [];

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (over && active.id !== over.id) {
            // Find old and new indices within current view
            const oldIndex = currentLinks.findIndex(link => link.id === active.id);
            const newIndex = currentLinks.findIndex(link => link.id === over.id);

            const newLinks = arrayMove(currentLinks, oldIndex, newIndex).map((link, index) => ({
                ...link,
                order: index,
            }));

            // Optimistically update top level or nested children array based on view
            setLinks(prev => {
                if (!selectedFolderId) {
                    // Update top level
                    return newLinks.map(n => {
                        const original = prev.find(p => p.id === n.id);
                        return { ...original, ...n, children: original?.children || [] };
                    });
                } else {
                    // Update children of the selected folder
                    return prev.map(parent => {
                        if (parent.id === selectedFolderId) {
                            return {
                                ...parent,
                                children: newLinks.map(n => {
                                    const original = parent.children?.find(c => c.id === n.id);
                                    return { ...original, ...n } as Link;
                                })
                            };
                        }
                        return parent;
                    });
                }
            });

            // Update order in database
            try {
                await fetch('/api/links', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        links: newLinks.map(link => ({ id: link.id, order: link.order })),
                    }),
                });
            } catch (error) {
                console.error('Failed to update order:', error);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {selectedFolderId ? (
                            <>
                                <button
                                    onClick={() => setSelectedFolderId(null)}
                                    className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1.5 rounded-lg transition-colors text-gray-500"
                                    title="Back to Top Level"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <span>{links.find(l => l.id === selectedFolderId)?.title || 'Folder'}</span>
                            </>
                        ) : 'Your Links'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {selectedFolderId
                            ? 'Manage links inside this folder'
                            : 'Add, edit, and reorganize your links and folders'}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    {!selectedFolderId && (
                        <button
                            onClick={() => {
                                setIsAdding(true);
                                setAddingType('folder');
                            }}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl text-sm font-semibold transition-all w-full sm:w-auto"
                        >
                            <Plus className="w-4 h-4" />
                            Add Folder
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setIsAdding(true);
                            setAddingType('link');
                        }}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-primary-500/20 hover:-translate-y-0.5 w-full sm:w-auto"
                    >
                        <Plus className="w-4 h-4" />
                        Add Link
                    </button>
                </div>
            </div>

            {/* Add Link Form */}
            {isAdding && (
                <div className="relative overflow-hidden bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 mb-8 shadow-sm animate-slide-down">
                    <form onSubmit={handleAddLink} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-300 mb-2">
                                    {addingType === 'folder' ? 'Folder Name' : 'Link Title'}
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-400"
                                    placeholder={addingType === 'folder' ? 'My Socials' : 'My Website'}
                                    value={newLink.title}
                                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                    required
                                />
                            </div>
                            {addingType === 'link' && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-300 mb-2">Destination URL</label>
                                    <input
                                        type="url"
                                        className="w-full bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-400"
                                        placeholder="https://example.com"
                                        value={newLink.url}
                                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                        required
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-300 mb-2">Icon & Branding</label>
                            <IconPicker
                                value={newLink.icon}
                                onChange={(icon) => setNewLink({ ...newLink, icon })}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-5 border-t border-gray-100 dark:border-gray-800/50">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsAdding(false);
                                    setNewLink({ title: '', url: '', icon: '' });
                                }}
                                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="flex items-center justify-center gap-2 px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-primary-500/20 hover:-translate-y-0.5">
                                {addingType === 'folder' ? 'Create Folder' : 'Add Link'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Links List */}
            {currentLinks.length === 0 ? (
                <div className="relative overflow-hidden bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-3xl p-12 text-center shadow-sm group">
                    <div className="absolute left-1/2 -top-12 -translate-x-1/2 w-48 h-48 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-all duration-700 pointer-events-none" />

                    <div className="relative z-10 font-[family-name:var(--font-geist-sans)]">
                        <div className="w-20 h-20 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-6 border border-primary-200/50 dark:border-primary-800/50 shadow-inner">
                            <Plus className="w-10 h-10 text-primary-500 dark:text-primary-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No links yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                            Start building your audience by adding your first link. Share your social profiles, websites, and more.
                        </p>
                        <button onClick={() => setIsAdding(true)} className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-primary-500/20 hover:-translate-y-0.5">
                            <Plus className="w-4 h-4" />
                            Add Your First Link
                        </button>
                    </div>
                </div>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={currentLinks.map(link => link.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-4">
                            {currentLinks.map((link) => (
                                <SortableLinkItem
                                    key={link.id}
                                    link={link}
                                    onDelete={handleDeleteLink}
                                    onToggle={handleToggleActive}
                                    onUpdate={(updatedLink) => {
                                        setLinks(prev => {
                                            if (!selectedFolderId) {
                                                return prev.map(l => l.id === updatedLink.id ? updatedLink : l);
                                            } else {
                                                return prev.map(p => {
                                                    if (p.id === selectedFolderId) {
                                                        return {
                                                            ...p,
                                                            children: p.children?.map(c => c.id === updatedLink.id ? updatedLink : c)
                                                        };
                                                    }
                                                    return p;
                                                });
                                            }
                                        });
                                    }}
                                    onOpenFolder={() => setSelectedFolderId(link.id)}
                                    onMoveOut={selectedFolderId ? () => handleMoveLink(link.id, null) : undefined}
                                />
                            ))}
                        </div>
                    </SortableContext>

                    <DragOverlay adjustScale={true}>
                        {activeId ? (
                            <div className="w-full">
                                <LinkItem
                                    link={currentLinks.find(l => l.id === activeId)!}
                                    isOverlay
                                />
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            )}

            {/* Available Links to Move into Folder */}
            {selectedFolderId && (
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800/50 animate-fade-in">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <FolderOpen className="w-5 h-5 text-primary-500" />
                        Add Existing Links
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Select from your top-level links to move them into this folder.</p>

                    {availableLinks.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 dark:bg-gray-900/20 rounded-2xl border border-gray-200 border-dashed dark:border-gray-800/50">
                            <p className="text-sm text-gray-500">No top-level links available to move.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {availableLinks.map(link => {
                                const IconComp = getIconComponent(link.icon);
                                const isCustom = link.icon?.startsWith('http') || false;
                                return (
                                    <div key={link.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl gap-4 hover:border-primary-500/30 transition-colors">
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="shrink-0 w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700/50">
                                                {isCustom ? (
                                                    /* eslint-disable-next-line @next/next/no-img-element */
                                                    <img src={link.icon!} alt={link.title} className="w-6 h-6 object-cover rounded-md" />
                                                ) : (
                                                    <IconComp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                                )}
                                            </div>
                                            <div className="min-w-0 pr-2">
                                                <p className="font-semibold text-gray-900 dark:text-white truncate">{link.title}</p>
                                                {link.url && <p className="text-xs text-gray-500 truncate mt-0.5">{link.url}</p>}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleMoveLink(link.id, selectedFolderId)}
                                            className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 dark:text-primary-400 dark:bg-primary-900/20 dark:hover:bg-primary-900/40 rounded-xl transition-all whitespace-nowrap"
                                        >
                                            Move Here
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}


        </div>
    );
}

interface LinkItemProps {
    link: Link;
    isOverlay?: boolean;
    dragHandleProps?: any;
    isEditing?: boolean;
    editData?: any;
    onEditDataChange?: (data: any) => void;
    onSave?: () => void;
    onCancel?: () => void;
    onDelete?: (id: string) => void;
    onToggle?: (id: string, isActive: boolean) => void;
    onStartEdit?: () => void;
    onOpenFolder?: () => void;
    onMoveOut?: () => void;
    isExpanded?: boolean;
    onToggleExpand?: () => void;
}

function LinkItem({
    link,
    isOverlay,
    dragHandleProps,
    isEditing,
    editData,
    onEditDataChange,
    onSave,
    onCancel,
    onDelete,
    onToggle,
    onStartEdit,
    onOpenFolder,
    onMoveOut,
    isExpanded,
    onToggleExpand
}: LinkItemProps) {
    const IconComponent = getIconComponent(link.icon);
    const isCustomUrl = link.icon?.startsWith('http') || false;

    return (
        <div
            className={`group relative overflow-hidden bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-4 sm:p-5 transition-all duration-300 ${!link.isActive && !isOverlay ? 'opacity-60 bg-gray-50/50 dark:bg-gray-900/20' : ''
                } ${isOverlay
                    ? 'shadow-2xl border-primary-500 ring-4 ring-primary-500/20 rotate-[2deg] scale-[1.02] cursor-grabbing z-50'
                    : 'hover:shadow-lg hover:border-primary-500/50 hover:bg-white dark:hover:bg-gray-900/60'
                }`}
        >
            <div className="flex items-start gap-3 sm:gap-4">
                {/* Drag Handle */}
                <button
                    {...dragHandleProps}
                    className={`p-2 sm:p-3 text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-colors ${isOverlay ? 'cursor-grabbing text-primary-500' : 'cursor-grab'
                        } shrink-0 mt-1`}
                    title="Drag to reorder"
                >
                    <GripVertical className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <div className="space-y-4 w-full">
                            <div className={`grid ${link.isFolder ? 'grid-cols-1' : 'sm:grid-cols-2'} gap-4`}>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
                                        {link.isFolder ? 'Folder Title' : 'Link Title'}
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-white dark:bg-gray-900 px-3 py-2.5 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-sm"
                                        placeholder={link.isFolder ? "Folder Title" : "Title"}
                                        value={editData.title}
                                        onChange={(e) => onEditDataChange?.({ ...editData, title: e.target.value })}
                                    />
                                </div>
                                {!link.isFolder && (
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
                                            Direct URL
                                        </label>
                                        <input
                                            type="url"
                                            className="w-full bg-white dark:bg-gray-900 px-3 py-2.5 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-sm"
                                            placeholder="URL"
                                            value={editData.url}
                                            onChange={(e) => onEditDataChange?.({ ...editData, url: e.target.value })}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
                                    Icon & Branding
                                </label>
                                <IconPicker
                                    value={editData.icon}
                                    onChange={(icon) => onEditDataChange?.({ ...editData, icon })}
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800/50">
                                <button
                                    onClick={onCancel}
                                    className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onSave}
                                    className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-semibold shadow-sm shadow-primary-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <Check className="w-4 h-4" />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                            <div className="flex-1 flex items-center gap-4 sm:gap-5 min-w-0">
                                {/* Icon Preview */}
                                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700/50 shadow-inner group-hover:border-primary-200 dark:group-hover:border-primary-800/50 group-hover:bg-primary-50/50 dark:group-hover:bg-primary-900/10 transition-colors">
                                    {isCustomUrl ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img src={link.icon!} alt={link.title} className="w-7 h-7 sm:w-8 sm:h-8 object-cover rounded-lg shadow-sm" />
                                    ) : (
                                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 group-hover:text-primary-500 transition-colors" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-900 dark:text-white truncate text-base sm:text-lg mb-0.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {link.title}
                                    </p>
                                    {!link.isFolder && link.url && (
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary-500 truncate hover:underline flex items-center gap-1.5 group/link w-fit">
                                            {link.url}
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                        </a>
                                    )}
                                    {link.isFolder && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onToggleExpand?.();
                                            }}
                                            className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 mt-1 group/btn"
                                        >
                                            <span>{link.children?.length || 0} link(s)</span>
                                            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                        </button>
                                    )}
                                </div>

                                {/* Manage/Clicks Stat Button (Desktop) */}
                                {link.isFolder ? (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onOpenFolder?.();
                                        }}
                                        className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-all shadow-sm shadow-primary-500/20 hover:-translate-y-0.5 whitespace-nowrap"
                                    >
                                        <FolderOpen className="w-4 h-4" />
                                        Manage Folder
                                    </button>
                                ) : (
                                    <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800/80 rounded-full text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700/50 whitespace-nowrap">
                                        <Eye className="w-3.5 h-3.5 text-primary-500" />
                                        <span>{link.clicks} clicks</span>
                                    </div>
                                )}
                            </div>

                            {/* Actions Group */}
                            {!isOverlay && (
                                <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-auto shrink-0 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100 dark:border-gray-800/50">
                                    {link.isFolder && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onOpenFolder?.();
                                            }}
                                            className="lg:hidden flex justify-center items-center gap-2 px-3 py-2 text-sm font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 dark:text-primary-400 dark:bg-primary-900/20 rounded-xl transition-all shadow-sm"
                                        >
                                            Open
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onStartEdit?.();
                                        }}
                                        className="p-2.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 rounded-xl transition-all hover:border-blue-300 dark:hover:border-blue-500/30 shadow-sm"
                                        title="Edit"
                                    >
                                        <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onToggle?.(link.id, !link.isActive);
                                        }}
                                        className={`p-2.5 rounded-xl border transition-all shadow-sm ${link.isActive
                                            ? 'text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 hover:border-amber-300 dark:hover:border-amber-500/30'
                                            : 'text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 hover:border-green-300 dark:hover:border-green-500/30'
                                            }`}
                                        title={link.isActive ? 'Hide' : 'Show'}
                                    >
                                        {link.isActive ? <Eye className="w-4 h-4 sm:w-5 sm:h-5" /> : <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    </button>
                                    {onMoveOut && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onMoveOut();
                                            }}
                                            className="p-2.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 rounded-xl transition-all hover:border-orange-300 dark:hover:border-orange-500/30 shadow-sm"
                                            title="Remove from Folder"
                                        >
                                            <FolderMinus className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete?.(link.id);
                                        }}
                                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 rounded-xl transition-all hover:border-red-300 dark:hover:border-red-500/30 shadow-sm"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Quick View List - Rendered outside the main row but inside the same div level */}
                    {!isEditing && link.isFolder && isExpanded && (
                        <div className="w-full mt-6 pl-8 sm:pl-16 pr-2 space-y-2 animate-fade-in border-l-2 border-gray-100 dark:border-gray-800 ml-4 sm:ml-7">
                            {link.children?.length === 0 ? (
                                <p className="text-xs text-gray-400 italic py-2">No links in this folder</p>
                            ) : (
                                link.children?.map((child) => {
                                    const ChildIcon = getIconComponent(child.icon);
                                    const isChildCustom = child.icon?.startsWith('http') || false;
                                    return (
                                        <a
                                            key={child.id}
                                            href={child.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-gray-50/50 dark:bg-gray-900/20 border border-gray-100 dark:border-gray-800/50 hover:border-primary-500/30 hover:bg-white dark:hover:bg-gray-800/60 transition-all group/nested"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="shrink-0 w-8 h-8 rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center group-hover/nested:border-primary-500/30 transition-colors">
                                                    {isChildCustom ? (
                                                        /* eslint-disable-next-line @next/next/no-img-element */
                                                        <img src={child.icon!} alt="" className="w-4 h-4 object-contain" />
                                                    ) : (
                                                        <ChildIcon className="w-4 h-4 text-gray-400 group-hover/nested:text-primary-500 transition-colors" />
                                                    )}
                                                </div>
                                                <div className="min-w-0 pr-2">
                                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 truncate block group-hover/nested:text-primary-600 dark:group-hover/nested:text-primary-400">{child.title}</span>
                                                    {child.url && <span className="text-[10px] text-gray-500 truncate block mt-0.5">{child.url}</span>}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1.5 opacity-60 group-hover/nested:opacity-100 transition-opacity">
                                                <div className="px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-[10px] font-bold text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-800/50">
                                                    {child.clicks} clicks
                                                </div>
                                                <ExternalLink className="w-3 h-3 text-primary-500 opacity-0 group-hover/nested:opacity-100 transition-all" />
                                            </div>
                                        </a>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

interface SortableLinkItemProps {
    link: Link;
    onDelete: (id: string) => void;
    onToggle: (id: string, isActive: boolean) => void;
    onUpdate: (link: Link) => void;
    onOpenFolder?: () => void;
    onMoveOut?: () => void;
}

function SortableLinkItem({
    link,
    onDelete,
    onUpdate,
    onToggle,
    onOpenFolder,
    onMoveOut
}: SortableLinkItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [editData, setEditData] = useState({ title: link.title, url: link.url || '', icon: link.icon || '' });

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: link.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1, // Dim the original item significantly
        position: 'relative' as const,
        zIndex: isDragging ? 0 : 1,
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/links/${link.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData),
            });

            if (res.ok) {
                onUpdate({ ...link, ...editData });
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Failed to update link:', error);
        }
    };

    return (
        <div ref={setNodeRef} style={style}>
            <LinkItem
                link={link}
                dragHandleProps={{ ...attributes, ...listeners }}
                isEditing={isEditing}
                editData={editData}
                onEditDataChange={setEditData}
                onSave={handleSave}
                onCancel={() => setIsEditing(false)}
                onDelete={onDelete}
                onToggle={onToggle}
                onStartEdit={() => setIsEditing(true)}
                onOpenFolder={onOpenFolder}
                onMoveOut={onMoveOut}
                isExpanded={isExpanded}
                onToggleExpand={() => setIsExpanded(!isExpanded)}
            />
        </div>
    );
}
