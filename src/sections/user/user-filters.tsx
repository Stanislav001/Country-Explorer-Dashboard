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

// ----------------------------------------------------------------------

export type FiltersProps = {
    userRole: string;
    userType: string;
};

type UserFiltersProps = {
    openFilter: boolean;
    filters: FiltersProps;
    onOpenFilter: () => void;
    onCloseFilter: () => void;
    onSetFilters: (updateState: Partial<FiltersProps>) => void;
    options: {
        userRole: { value: string; label: string }[];
        userType: { value: string; label: string }[];
    };
};

export function UserFilters({
    filters,
    options,
    openFilter,
    onSetFilters,
    onOpenFilter,
    onCloseFilter,
}: UserFiltersProps) {
    const renderUserRole = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">Roles</Typography>
            <FormGroup>
                {options?.userRole.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        control={
                            <Radio
                                checked={filters.userRole === option.value}
                                onChange={() => {
                                    onSetFilters({ userRole: option.value });
                                }}
                            />
                        }
                        label={option.label}
                    />
                ))}
            </FormGroup>
        </Stack>
    );

    const renderUserType = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">Type</Typography>
            <RadioGroup>
                {options.userType.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={
                            <Radio
                                checked={filters.userType === option.value}
                                onChange={() => {
                                    onSetFilters({ userType: option.value });
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
                        {renderUserRole}
                        {renderUserType}
                    </Stack>
                </Scrollbar>
            </Drawer>
        </>
    );
}
