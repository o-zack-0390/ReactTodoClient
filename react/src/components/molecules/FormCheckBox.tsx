import React from "react";
import { FormCheckBoxType } from "../../types/FormType";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface FormCheckBoxProps {
    label: string,
    options: FormCheckBoxType[]
    handleCheckChange: (selected: FormCheckBoxType[]) => void
}

/* チェックボックス形式のフォームを描画する Molecule コンポーネント */
export const FormCheckBox: React.FC<FormCheckBoxProps> = ({
    label,
    options,
    handleCheckChange
}) => {

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    // 選択されたカテゴリーIDを取得するハンドラー
    const handleChange = (_event: React.SyntheticEvent, newValue: FormCheckBoxType[]) => {
        handleCheckChange(newValue);
        console.log(newValue)
    };

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            onChange={handleChange}
            options={options}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                    <li key={key} {...optionProps}>
                        <Checkbox
                            id={key}
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.name}
                    </li>
                );
            }}
            style={{ minWidth: "150px" }}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder="カテゴリーを選択" />
            )}
        />
    );
}
