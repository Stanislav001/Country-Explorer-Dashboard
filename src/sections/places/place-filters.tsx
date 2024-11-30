import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

export type FiltersProps = {
    countries: string;
};

type PlaceFiltersProps = {
    openFilter: boolean;
    filters: FiltersProps;
    onOpenFilter: () => void;
    onCloseFilter: () => void;
    onSetFilters: (updateState: Partial<FiltersProps>) => void;
    options: {
        countries: { value: string; label: string }[];
    };
};

export function PlaceFilters({
    filters,
    options,
    openFilter,
    onSetFilters,
    onOpenFilter,
    onCloseFilter,
}: PlaceFiltersProps) {
    const renderCountries = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">Countries</Typography>
            <RadioGroup>
                {options?.countries?.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={
                            <Radio
                                checked={filters.countries === option.value}
                                onChange={() => {
                                    onSetFilters({ countries: option.value });
                                }}
                            />
                        }
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        </Stack>
    );

    return (
        <>
            <Button
                disableRipple
                color="inherit"
                onClick={onOpenFilter}
            >
                Filters
            </Button>

            <Drawer
                anchor="right"
                open={openFilter}
                onClose={onCloseFilter}
                PaperProps={{
                    sx: { width: 280, overflow: 'hidden' },
                }}
            >
                <Box display="flex" alignItems="center" sx={{ pl: 2.5, pr: 1.5, py: 2 }}>
                    <Typography variant="h6" flexGrow={1}>
                        Filters
                    </Typography>

                    <IconButton onClick={onCloseFilter}>
                        <Iconify icon="mingcute:close-line" />
                    </IconButton>
                </Box>

                <Divider />

                <Scrollbar>
                    <Stack spacing={3} sx={{ p: 3 }}>
                        {renderCountries}
                    </Stack>
                </Scrollbar>
            </Drawer>
        </>
    );
}
