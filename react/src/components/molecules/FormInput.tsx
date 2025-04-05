import * as React from 'react';
import TextField from '@mui/material/TextField';

interface FormInputProps {
    label: string,
    handleTextChange: (value: string) => void
}

/* 入力形式のフォームを描画する Molecule コンポーネント */
export const FormInput: React.FC<FormInputProps> = ({
    label,
    handleTextChange
}) => {

    // 入力値の変更を処理するハンドラー
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleTextChange(event.target.value);
    };

    return (
        <TextField
            id="outlined-basic"
            label={label}
            variant="outlined"
            onChange={handleChange}
            sx={{ minWidth: "150px" }}
        />
    );
}
