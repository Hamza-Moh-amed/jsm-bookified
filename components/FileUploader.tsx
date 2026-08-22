"use client"
import { FileUploadFieldProps } from '@/types'
import React, { useRef } from 'react'
import { Controller, FieldValues } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from './ui/field'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

const FileUploader =  <T extends FieldValues>
({control, name, label, acceptTypes, disabled, placeholder, hint, icon: Icon,}:
FileUploadFieldProps<T>) => {

    const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Controller
    control={control}
    name={name}
    render={({field, fieldState}) => {
        const isUploaded = !!field.value

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) field.onChange(file)
        }

        const onRemove = (e:React.MouseEvent) => {
            e.stopPropagation()
            field.onChange(undefined);
            if (inputRef.current) inputRef.current.value = ""
        }

        return (
            <Field className="w-full" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                <div
                    className={cn(
                        'upload-dropzone border-2 border-dashed border-[#8B7355]/20',
                        isUploaded && 'upload-dropzone-uploaded'
                    )}
                    onClick={() => !disabled && inputRef.current?.click()}
                    aria-invalid={fieldState.invalid}
                >
                    <input
                        type="file"
                        id={field.name}
                        accept={acceptTypes.join(',')}
                        className="hidden"
                        ref={(element) => {
                            inputRef.current = element;
                            field.ref(element);
                        }}
                        onChange={handleFileChange}
                        disabled={disabled}
                        aria-invalid={fieldState.invalid}
                    />

                    {isUploaded ? (
                        <div className="flex flex-col items-center relative w-full px-4">
                            <p className="upload-dropzone-text line-clamp-1">{(field.value as File).name}</p>
                            <button
                                type="button"
                                onClick={onRemove}
                                className="upload-dropzone-remove mt-2"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Icon className="upload-dropzone-icon" />
                            <p className="upload-dropzone-text">{placeholder}</p>
                            <p className="upload-dropzone-hint">{hint}</p>
                        </>
                    )}
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
        );
    }}
/>
);
};

export default FileUploader;