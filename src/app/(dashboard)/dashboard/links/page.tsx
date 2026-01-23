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
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import IconPicker from '@/components/dashboard/icon-picker';

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

    const sensors = useSensors(
        useSensor(PointerSensor),
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

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
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
                    className="btn-primary"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Link
                </button>
            </div>

            {/* Add Link Form */}
            {isAdding && (
                <div className="card p-6 mb-6 animate-slide-down">
                    <form onSubmit={handleAddLink} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Title</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="My Website"
                                    value={newLink.title}
                                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">URL</label>
                                <input
                                    type="url"
                                    className="input-field"
                                    placeholder="https://example.com"
                                    value={newLink.url}
                                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <IconPicker
                            value={newLink.icon}
                            onChange={(icon) => setNewLink({ ...newLink, icon })}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsAdding(false);
                                    setNewLink({ title: '', url: '', icon: '' });
                                }}
                                className="btn-ghost"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn-primary">
                                Add Link
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Links List */}
            {links.length === 0 ? (
                <div className="card p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No links yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Add your first link to get started
                    </p>
                    <button onClick={() => setIsAdding(true)} className="btn-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Link
                    </button>
                </div>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={links.map(link => link.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-3">
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
                </DndContext>
            )}

            <div className="mt-12 text-center text-sm text-gray-500">
                made with 💙 by tushar bhardwaj
            </div>
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
    const [editData, setEditData] = useState({ title: link.title, url: link.url });

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
        opacity: isDragging ? 0.5 : 1,
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
        <div
            ref={setNodeRef}
            style={style}
            className={`card p-4 flex items-center gap-4 ${!link.isActive ? 'opacity-60' : ''}`}
        >
            <button
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
            >
                <GripVertical className="w-5 h-5" />
            </button>

            <div className="flex-1 min-w-0">
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            className="input-field py-1 px-2 text-sm"
                            value={editData.title}
                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        />
                        <input
                            type="url"
                            className="input-field py-1 px-2 text-sm"
                            value={editData.url}
                            onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                        />
                        <button onClick={handleSave} className="p-1 text-green-600 hover:text-green-700">
                            <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setIsEditing(false)} className="p-1 text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                            {link.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{link.url}</p>
                    </>
                )}
            </div>

            <div className="flex items-center gap-1 text-sm text-gray-500">
                <span>{link.clicks} clicks</span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    title="Edit"
                >
                    <Edit3 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onToggle(link.id, !link.isActive)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    title={link.isActive ? 'Hide' : 'Show'}
                >
                    {link.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    title="Open link"
                >
                    <ExternalLink className="w-4 h-4" />
                </a>
                <button
                    onClick={() => onDelete(link.id)}
                    className="p-2 text-gray-400 hover:text-red-500"
                    title="Delete"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
