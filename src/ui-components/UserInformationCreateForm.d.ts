/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserInformationCreateFormInputValues = {
    name?: string;
    groupId?: number;
};
export declare type UserInformationCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    groupId?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserInformationCreateFormOverridesProps = {
    UserInformationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    groupId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserInformationCreateFormProps = React.PropsWithChildren<{
    overrides?: UserInformationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserInformationCreateFormInputValues) => UserInformationCreateFormInputValues;
    onSuccess?: (fields: UserInformationCreateFormInputValues) => void;
    onError?: (fields: UserInformationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserInformationCreateFormInputValues) => UserInformationCreateFormInputValues;
    onValidate?: UserInformationCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserInformationCreateForm(props: UserInformationCreateFormProps): React.ReactElement;
