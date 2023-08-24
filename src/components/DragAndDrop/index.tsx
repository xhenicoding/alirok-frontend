import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import * as S from './style'

export type DragAndDropProps = {
  dependencies?: React.DependencyList
  accept: string
  multiple: boolean
  children: React.ReactNode
  style?: React.CSSProperties
  props?: React.ComponentProps<'div'>
  kind?: string
  handleFile: (file: Blob, binary?: string | ArrayBuffer | null) => void
}

export function DragAndDropFile({
  dependencies,
  accept,
  multiple,
  children,
  style,
  handleFile,
  kind,
  ...props
}: DragAndDropProps) {
  const dependenciesFilter =
    dependencies && dependencies?.length > 0 ? [...dependencies] : []
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = async () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        handleFile(file, binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependenciesFilter)

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept: accept })

  return (
    <S.StyledDragAndDropFileArea
      kind={kind}
      style={style}
      {...props}
      {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
    >
      <S.Input {...getInputProps({ multiple: multiple })} />
      {children}
    </S.StyledDragAndDropFileArea>
  )
}
