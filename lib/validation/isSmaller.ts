import 'reflect-metadata';
import { PREFIX } from '../shared/const';
import { getMetaDataKey } from '../shared/helper';
import { IValidation } from './IValidation';

/**
 * IsSmaller Decorator will check if the marked parameter is smaller then the provided value.
 * It will throw an error if the value is greater or equal.
 * @param value target value
 */
export function isSmaller(value: number) {
    const getKey = getMetaDataKey(PREFIX.Validation);
    return (target: any, propertyName: string, index: number) => {
        const META_DATA_KEY = getKey(propertyName);
        const listOfValidations: IValidation[] = Reflect.getOwnMetadata(META_DATA_KEY, target, propertyName) || [];

        const validator = (param: number) => {
            if (typeof param !== 'number') {
                throw new Error(`${propertyName}: Parameter ${index} was not a number`);
            } else if (param < value) {
                return true;
            } else {
                throw new Error(`${propertyName}: Parameter ${index} was not smaller then ${value}`);
            }
        };
        listOfValidations.push({ index, validate: validator });

        Reflect.defineMetadata(META_DATA_KEY, listOfValidations, target, propertyName);
    };
}
