import {ValidationErrorType} from '../types/validationErrorType';
import {ValidationErrorDto} from '../types/validationError.dto';

export const createErrorMessages = (
    errors: ValidationErrorType[],
): ValidationErrorDto => {
    return {errorMessages: errors};
};