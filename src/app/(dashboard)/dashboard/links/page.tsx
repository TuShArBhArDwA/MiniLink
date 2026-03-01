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
    X
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
    clicks: number;
}

export default function LinksPage() {
    const [links, setLinks] = useState<Link[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newLink, setNewLink] = useState({ title: '', url: '', icon: '' });
    const [activeId, setActiveId] = useState<string | null>(null);

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
        if (!newLink.title || !newLink.url) return;

        try {
            const res = await fetch('/api/links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newLink),
            });

            if (res.ok) {
                const link = await res.json();
                setLinks([...links, link]);
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
            setLinks(links.filter(link => link.id !== id));
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
            setLinks(links.map(link =>
                link.id === id ? { ...link, isActive } : link
            ));
        } catch (error) {
            console.error('Failed to toggle link:', error);
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (over && active.id !== over.id) {
            const oldIndex = links.findIndex(link => link.id === active.id);
            const newIndex = links.findIndex(link => link.id === over.id);

            const newLinks = arrayMove(links, oldIndex, newIndex).map((link, index) => ({
                ...link,
                order: index,
            }));

            setLinks(newLinks);

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
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Your Links
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Add, edit, and reorder your links
                    </p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-primary-500/20 hover:-translate-y-0.5 sm:w-auto w-full"
                >
                    <Plus className="w-4 h-4" />
                    Add Link
                </button>
            </div>

            {/* Add Link Form */}
            {isAdding && (
                <div className="relative overflow-hidden bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 mb-8 shadow-sm animate-slide-down">
                    <form onSubmit={handleAddLink} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-300 mb-2">Link Title</label>
                                <input
                                    type="text"
                                    className="w-full bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="My Website"
                                    value={newLink.title}
                                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                    required
                                />
                            </div>
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
                                Add Link
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Links List */}
            {links.length === 0 ? (
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
                        items={links.map(link => link.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-4">
                            {links.map((link) => (
                                <SortableLinkItem
                                    key={link.id}
                                    link={link}
                                    onDelete={handleDeleteLink}
                                    onToggle={handleToggleActive}
                                    onUpdate={(updatedLink) => {
                                        setLinks(links.map(l => l.id === updatedLink.id ? updatedLink : l));
                                    }}
                                />
                            ))}
                        </div>
                    </SortableContext>

                    <DragOverlay adjustScale={true}>
                        {activeId ? (
                            <div className="w-full">
                                <LinkItem
                                    link={links.find(l => l.id === activeId)!}
                                    isOverlay
                                />
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
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
    onStartEdit
}: LinkItemProps) {
    const IconComponent = getIconComponent(link.icon);
    const isCustomUrl = link.icon?.startsWith('http') || false;

    return (
        <div
            className={`group relative overflow-hidden bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-300 ${!link.isActive && !isOverlay ? 'opacity-60 bg-gray-50/50 dark:bg-gray-900/20' : ''
                } ${isOverlay
                    ? 'shadow-2xl border-primary-500 ring-4 ring-primary-500/20 rotate-[2deg] scale-[1.02] cursor-grabbing z-50'
                    : 'hover:shadow-lg hover:border-primary-500/50 hover:bg-white dark:hover:bg-gray-900/60'
                }`}
        >
            {/* Drag Handle */}
            <button
                {...dragHandleProps}
                className={`p-2 sm:p-3 text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-colors ${isOverlay ? 'cursor-grabbing text-primary-500' : 'cursor-grab'
                    } self-start sm:self-auto shrink-0`}
                title="Drag to reorder"
            >
                <GripVertical className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Content Area */}
            <div className="flex-1 min-w-0 w-full animate-fade-in">
                {isEditing ? (
                    <div className="space-y-4 w-full">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
                                    Link Title
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-white dark:bg-gray-900 px-3 py-2.5 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-sm"
                                    placeholder="Title"
                                    value={editData.title}
                                    onChange={(e) => onEditDataChange?.({ ...editData, title: e.target.value })}
                                />
                            </div>
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
                    <div className="flex items-center gap-4 sm:gap-5 w-full">
                        {/* Icon Preview */}
                        <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700/50 shadow-inner group-hover:border-primary-200 dark:group-hover:border-primary-800/50 group-hover:bg-primary-50/50 dark:group-hover:bg-primary-900/10 transition-colors">
                            {isCustomUrl ? (
                                <img src={link.icon!} alt={link.title} className="w-7 h-7 sm:w-8 sm:h-8 object-cover rounded-lg shadow-sm" />
                            ) : (
                                <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 group-hover:text-primary-500 transition-colors" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0 pr-2">
                            <p className="font-bold text-gray-900 dark:text-white truncate text-base sm:text-lg mb-0.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {link.title}
                            </p>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary-500 truncate hover:underline flex items-center gap-1.5 group/link w-fit">
                                {link.url}
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                            </a>
                        </div>

                        {/* Stats Badge */}
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800/80 rounded-full text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700/50">
                            <Eye className="w-3.5 h-3.5 text-primary-500" />
                            <span>{link.clicks} clicks</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Actions */}
            {!isEditing && !isOverlay && (
                <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-auto shrink-0 w-full justify-end sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100 dark:border-gray-800/50">
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
    );
}

interface SortableLinkItemProps {
    link: Link;
    onDelete: (id: string) => void;
    onToggle: (id: string, isActive: boolean) => void;
    onUpdate: (link: Link) => void;
}

function SortableLinkItem({ link, onDelete, onToggle, onUpdate }: SortableLinkItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ title: link.title, url: link.url, icon: link.icon || '' });

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
            />
        </div>
    );
}
