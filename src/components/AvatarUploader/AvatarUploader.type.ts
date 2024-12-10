export interface AvatarUploaderProps {
    previewUrl?: string
    value: File | null
    onChange?: (file: File) => void
}