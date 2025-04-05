import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormSelectType } from '../../types/FormType';

interface FormSelectProps {
    label: string,
    options: FormSelectType[],
    handleSelectChange: (value: FormSelectType) => void
}

/* セレクト形式のフォームを描画する Molecule コンポーネント */
export const FormSelect: React.FC<FormSelectProps> = ({
    label, options, handleSelectChange
}) => {

    // 選択されたカテゴリーIDを取得するハンドラー
    const handleChange = (_event: React.SyntheticEvent, newValue: FormSelectType | null) => {
        if (newValue) {
            handleSelectChange(newValue);
            console.log(newValue);
        }
    };

    return (
        <Autocomplete
            id="select-tags-demo"
            disablePortal
            onChange={handleChange}
            options={options}
            getOptionLabel={(option) => option.name}
            sx={{ minWidth: "150px" }}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder="Todoを選択" />
            )}
        />
    );
}
