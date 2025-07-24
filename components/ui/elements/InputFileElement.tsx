'use client'

import React, { useState, useRef, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputFileElementProps {
    name: string
    id: string
    placeholder?: string
    className?: string
    required?: boolean
    accept?: string
    multiple?: boolean
    disabled?: boolean
    onFileSelect?: (files: FileList | null) => void
}

const InputFileElement = forwardRef<HTMLInputElement, InputFileElementProps>(
    ({
        name,
        id,
        placeholder = "Choose a file...",
        className,
        required = false,
        accept,
        multiple = false,
        disabled = false,
        onFileSelect,
        ...props
    }, ref) => {
        const [selectedFileName, setSelectedFileName] = useState<string>('')
        const [isDragOver, setIsDragOver] = useState(false)
        const fileInputRef = useRef<HTMLInputElement>(null)

        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files
            if (files && files.length > 0) {
                if (multiple) {
                    const fileNames = Array.from(files).map(file => file.name).join(', ')
                    setSelectedFileName(fileNames)
                } else {
                    setSelectedFileName(files[0].name)
                }
                onFileSelect?.(files)
            } else {
                setSelectedFileName('')
                onFileSelect?.(null)
            }
        }

        const handleClick = () => {
            if (!disabled) {
                fileInputRef.current?.click()
            }
        }

        const handleDragOver = (event: React.DragEvent) => {
            event.preventDefault()
            setIsDragOver(true)
        }

        const handleDragLeave = (event: React.DragEvent) => {
            event.preventDefault()
            setIsDragOver(false)
        }

        const handleDrop = (event: React.DragEvent) => {
            event.preventDefault()
            setIsDragOver(false)

            if (disabled) return

            const files = event.dataTransfer.files
            if (files && files.length > 0) {
                if (multiple) {
                    const fileNames = Array.from(files).map(file => file.name).join(', ')
                    setSelectedFileName(fileNames)
                } else {
                    setSelectedFileName(files[0].name)
                }
                onFileSelect?.(files)

                // Update the input value
                if (fileInputRef.current) {
                    fileInputRef.current.files = files
                }
            }
        }

        return (
            <div className="relative">
                {/* Hidden input */}
                <input
                    ref={(node) => {
                        // Handle both refs
                        if (typeof ref === 'function') {
                            ref(node)
                        } else if (ref) {
                            ref.current = node
                        }
                        fileInputRef.current = node
                    }}
                    type="file"
                    name={name}
                    id={id}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                    required={required}
                    disabled={disabled}
                    {...props}
                />

                {/* Visible element */}
                <div
                    className={cn(
                        "w-full h-10 border border-green-900 bg-radial-green rounded-md flex items-center justify-center text-sm transition-colors",
                        "hover:bg-green-900 hover:text-white",
                        "focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2",
                        isDragOver && "border-green-600 bg-radial-green",
                        disabled && "opacity-50 cursor-not-allowed",
                        selectedFileName ? "text-white" : "text-green-200",
                        className
                    )}
                    onClick={handleClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    role="button"
                    tabIndex={disabled ? -1 : 0}
                    aria-label={placeholder}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            handleClick()
                        }
                    }}
                >
                    <div className="flex items-center gap-2">
                        {selectedFileName ? (
                            <>
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                <span className="truncate">{selectedFileName}</span>
                            </>
                        ) : (
                            <>
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                                <span>{placeholder}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }
)

InputFileElement.displayName = 'InputFileElement'

export default InputFileElement

