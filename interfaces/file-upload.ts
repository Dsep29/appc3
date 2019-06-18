
// para trabajar con las imagenes
// tslint:disable-next-line: interface-name
export interface FileUpload {
    name: string;
    data: any;
    encoding: string;
    tempFilePath: string;
    truncated: boolean;
    mimetype: string;

// tslint:disable-next-line: ban-types
    mv: Function;
}
