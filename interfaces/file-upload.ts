

// para trabajar con las imagenes
export interface FileUpload {
    name: string;
    data: any;
    encoding: string;
    tempFilePath: string;
    truncated: boolean;
    mimetype: string;

    mv: Function;
}