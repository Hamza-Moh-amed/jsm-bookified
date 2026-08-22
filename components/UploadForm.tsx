"use client"

import { UploadSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import LoadingOverlay from "./LoadingOverlay"
import { Field, FieldError, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { BookUploadFormValues } from "@/types"
import { Button } from "./ui/button"
import FileUploader from "./FileUploader"
import { ACCEPTED_IMAGE_TYPES, ACCEPTED_PDF_TYPES } from "@/lib/constants"
import { ImageIcon, Upload } from "lucide-react"
import VoiceSelector from "./VoiceSelector"





const UploadForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<BookUploadFormValues>({
        resolver: zodResolver(UploadSchema),
        defaultValues: {
            title: '',
            author: '',
            persona: '',
            pdfFile: undefined,
            coverImage: undefined,
        },
    });


      const onSubmit = async (data: BookUploadFormValues) => {
        console.log('Form submitted:', data);
        
    }



  return (
    <>
    
        {isSubmitting && <LoadingOverlay /> } 

        <div className="new-book-wrapper">

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


        {/* 1. PDF File Upload */}
        <FileUploader
        control={form.control}
        name="pdfFile"
        label="Book PDF File"
        acceptTypes={ACCEPTED_PDF_TYPES}
        icon={Upload}
        placeholder="Click to upload PDF"
        hint="PDF file (Max 50MB)"
        disabled={isSubmitting}
        />

        {/* 2. Cover Image Upload */}
        <FileUploader
        control={form.control}
        name="coverImage"
        label="Cover Image (Optional)"
        acceptTypes={ACCEPTED_IMAGE_TYPES}
        icon={ImageIcon}
        placeholder="Click to upload cover image"
        hint="Leave empty to auto-generate from PDF"
        disabled={isSubmitting}
    />
        


        {/* 3. Title Input */}

        <Controller
        control={form.control}
        name="title"
        render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="form-lable">
                    Title
                    </FieldLabel>
                    <Input
                    {...field}
                    id={field.name}
                    className="form-input"
                    placeholder="ex: Rich Dad Poor Dad"
                    disabled={isSubmitting}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
        )}  
        />

        {/* 4. Author Input */}
        
        <Controller
        control={form.control}
        name="author"
        render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="form-lable">
                    Author Name
                </FieldLabel>
                <Input 
                {...field}
                id={field.name}
                className="form-input"
                placeholder="ex: Robert Kiyosaki"
                disabled={isSubmitting}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
        )}
        />
     
        {/* 5. Voice Selector */}
        <Controller 
        control={form.control}
        name="persona"
        render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="form-label">
                    Choose Assistant Voice
                </FieldLabel>
                <VoiceSelector
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                disabled={isSubmitting}
                invalid={fieldState.invalid}
                />
                 {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
        )}

        />


             {/* 6. Submit Button */}
            <Button type="submit" className="form-btn" disabled={isSubmitting}>
                Begin Synthesis
            </Button>

        </form>
        </div> 
    
    </>
  )
}

export default UploadForm