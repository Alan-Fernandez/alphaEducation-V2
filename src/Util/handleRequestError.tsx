import { AxiosError } from 'axios';

export interface ErrorResponse {
non_field_errors?: string[];
[key: string]: any;
}


const handleRequestError = (error: AxiosError<ErrorResponse>, requestData: any) => {
    console.error('Error al enviar la solicitud:', error);

    if (error.response) {
        console.error('Error del servidor:', error.response.data);

        switch (error.response.status) {
            case 400:
                console.error('Error 400: Solicitud incorrecta');
                if (error.response.data.non_field_errors) {
                    console.error('Errores adicionales:', error.response.data.non_field_errors);
                }
                break;
            case 401:
                console.error('Error 401: No autorizado');
                break;
            case 403:
                console.error('Error 403: Prohibido');
                break;
            case 404:
                console.error('Error 404: No encontrado');
                break;
            case 500:
                console.error('Error 500: Error interno del servidor');
                break;
            default:
                console.error('Error inesperado:', error.response.status);
        }
    } else if (error.request) {
        console.error('No se recibió ninguna respuesta del servidor.');
    } else {
        console.error('Error al configurar la solicitud:', error.message);
    }

    // Registra detalles adicionales del error, como la solicitud que se estaba realizando
    console.error('Detalles de la solicitud:', requestData);
};

export { handleRequestError };