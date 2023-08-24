import Resizer from 'react-image-file-resizer'

interface MountImageProps {
  file: Blob
  acceptedImageTypes?: string | string[]
  maxWidth?: number
  maxHeight?: number
}

export function arrayBufferToBase64(buffer?: ArrayBuffer) {
  if (!buffer) {
    throw new Error('Buffer not provided')
  }
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

export function resizeFile({ file, maxWidth, maxHeight }: MountImageProps) {
  const promise = new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth || 100,
      maxHeight || 100,
      'PNG',
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      'blob'
    )
  })
  return promise as Promise<Blob>
}

export async function mountImageFile({
  file,
  acceptedImageTypes,
  maxWidth,
  maxHeight
}: MountImageProps) {
  let fileType: string | RegExpMatchArray | null =
    file.type.match(/\/([a-z]{3,})$/)
  fileType = fileType ? fileType[1] : ''
  acceptedImageTypes = acceptedImageTypes?.length
    ? acceptedImageTypes
    : ['jpeg', 'jpg', 'png']

  if (!acceptedImageTypes.includes(fileType)) {
    return {
      error: `This file type ${fileType} is not accepted.`
    }
  }

  const resizedFile = await resizeFile({ file, maxWidth, maxHeight })
  const resizedBinaryStr: ArrayBuffer = await resizedFile.arrayBuffer()

  return {
    resizedBinaryStr
  }
}
