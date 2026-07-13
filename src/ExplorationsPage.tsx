import * as React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { ComboBox, IComboBoxOption } from '@fluentui/react/lib/ComboBox';
import { ActionButton, IconButton } from '@fluentui/react/lib/Button';
import { Separator } from '@fluentui/react/lib/Separator';
import { Icon } from '@fluentui/react/lib/Icon';
import { useTheme, ITheme } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/merge-styles';
import { memoizeFunction } from '@fluentui/utilities';

const DATA_TYPE_OPTIONS: IDropdownOption[] = [
  { key: 'text', text: 'Text' },
  { key: 'date', text: 'Date' },
  { key: 'number', text: 'Number' },
];

function buildComboOptions(allowCustomText: boolean, dropdownOpts: string[]): IComboBoxOption[] {
  const valid = dropdownOpts.filter(o => o.trim());
  const result: IComboBoxOption[] = [{ key: 'select-date', text: 'Select date' }];
  if (allowCustomText) result.push({ key: 'custom', text: 'Add custom text' });
  if (valid.length > 0) {
    result.push({ key: 'd1', text: '–', itemType: 1 });
    result.push({ key: 'h1', text: 'Or select an option', itemType: 2 });
    valid.forEach((o, i) => result.push({ key: `opt${i}`, text: o }));
  }
  return result;
}

const getClassNames = memoizeFunction((theme: ITheme) =>
  mergeStyleSets({
    page: {
      flex: 1,
      overflow: 'auto' as const,
      backgroundColor: '#f3f2f1',
      padding: '28px 32px',
    },
    card: {
      backgroundColor: theme.palette.white,
      border: `1px solid ${theme.palette.neutralLight}`,
      borderRadius: 4,
      padding: '24px 28px',
    },
    previewCard: {
      backgroundColor: theme.palette.white,
      border: `1px solid ${theme.palette.neutralLight}`,
      borderRadius: 4,
      padding: '20px',
      width: 280,
      flexShrink: 0,
    },
    numberBadge: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      color: theme.palette.neutralSecondary,
      flexShrink: 0,
    },
    calloutContent: {
      padding: '20px',
      width: 320,
    },
    optionSummary: {
      fontSize: 12,
      color: theme.palette.neutralSecondary,
    },
    optionBuilderIndent: {
      borderLeft: `3px solid ${theme.palette.themePrimary}`,
      paddingLeft: 16,
    },
  })
);

// ─── Shared: Option builder ───────────────────────────────────────────────────

const OptionBuilder: React.FC<{ options: string[]; onChange: (opts: string[]) => void }> = ({ options, onChange }) => {
  const theme = useTheme();
  return (
    <Stack tokens={{ childrenGap: 8 }}>
      {options.map((opt, i) => (
        <Stack key={i} horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
          <Stack.Item grow={1}>
            <TextField
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(_, v) => {
                const next = [...options];
                next[i] = v || '';
                onChange(next);
              }}
            />
          </Stack.Item>
          <IconButton
            iconProps={{ iconName: 'Delete' }}
            ariaLabel={`Remove option ${i + 1}`}
            title="Remove option"
            styles={{ root: { color: theme.palette.neutralSecondary } }}
            onClick={() => onChange(options.filter((_, j) => j !== i))}
          />
        </Stack>
      ))}
      <ActionButton
        iconProps={{ iconName: 'Add' }}
        text="Add option"
        styles={{ root: { paddingLeft: 0, height: 32 } }}
        onClick={() => onChange([...options, ''])}
      />
    </Stack>
  );
};

// ─── Shared: User screen preview ─────────────────────────────────────────────

const UserPreview: React.FC<{
  fieldLabel: string;
  allowCustomText: boolean;
  dropdownOpts: string[];
}> = ({ fieldLabel, allowCustomText, dropdownOpts }) => {
  const theme = useTheme();
  const classNames = getClassNames(theme);
  const options = buildComboOptions(allowCustomText, dropdownOpts);
  const extraCount = (allowCustomText ? 1 : 0) + dropdownOpts.filter(o => o.trim()).length;

  return (
    <div className={classNames.previewCard}>
      <Stack tokens={{ childrenGap: 12 }}>
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6 }}>
          <Icon iconName="View" styles={{ root: { fontSize: 12, color: theme.palette.neutralSecondary } }} />
          <Text styles={{ root: { fontSize: 10, fontWeight: 600, color: theme.palette.neutralSecondary, letterSpacing: '0.6px' } }}>
            USER SCREEN PREVIEW
          </Text>
        </Stack>
        <Separator />
        <Stack tokens={{ childrenGap: 6 }}>
          <Label>{fieldLabel}</Label>
          <ComboBox
            placeholder="Select date"
            options={options}
            styles={{ root: { width: '100%' } }}
          />
        </Stack>
        <Text styles={{ root: { fontSize: 11, color: theme.palette.neutralTertiary } }}>
          {extraCount === 0
            ? 'Date picker only — no extra options'
            : `Date picker + ${extraCount} configured option${extraCount !== 1 ? 's' : ''}`}
        </Text>
      </Stack>
    </div>
  );
};

// ─── Exploration A ────────────────────────────────────────────────────────────

export const ExplorationsPage: React.FC = () => {
  const theme = useTheme();
  const classNames = getClassNames(theme);

  const [dataType, setDataType] = React.useState<string>('date');
  const [allowCustomText, setAllowCustomText] = React.useState(false);
  const [allowDropdown, setAllowDropdown] = React.useState(false);
  const [dropdownOpts, setDropdownOpts] = React.useState<string[]>(['']);

  return (
    <div className={classNames.page}>
      <Stack tokens={{ childrenGap: 24 }}>
        <Stack tokens={{ childrenGap: 6 }}>
          <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>
            Date Field UX — Exploration A
          </Text>
          <Text styles={{ root: { fontSize: 13, color: theme.palette.neutralSecondary } }}>
            Date-specific controls appear directly below the Data Type dropdown, only when Date is selected.
            The option builder expands inline when "Allow dropdown options" is enabled.
          </Text>
        </Stack>

        <Stack horizontal tokens={{ childrenGap: 24 }} styles={{ root: { alignItems: 'flex-start' } }}>
          <Stack.Item grow={1}>
            <div className={classNames.card}>
              <Stack tokens={{ childrenGap: 18 }}>
                {/* Card header */}
                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 12 }}>
                  <div className={classNames.numberBadge}>1</div>
                  <Text styles={{ root: { fontSize: 14, fontWeight: 600 } }}>Bookmark — H01_S05_01 (Date)</Text>
                </Stack>

                {/* Field label + Data type row */}
                <Stack horizontal tokens={{ childrenGap: 24 }} styles={{ root: { alignItems: 'flex-start' } }}>
                  <Stack tokens={{ childrenGap: 6 }}>
                    <Label>Field Label</Label>
                    <TextField
                      defaultValue="Start date"
                      styles={{ root: { width: 180 }, fieldGroup: { backgroundColor: theme.palette.neutralLighter } }}
                    />
                  </Stack>

                  {/* Data Type + its date sub-controls — grouped as one column */}
                  <Stack tokens={{ childrenGap: 10 }}>
                    <Stack tokens={{ childrenGap: 6 }}>
                      <Label required>Data Type</Label>
                      <Dropdown
                        selectedKey={dataType}
                        options={DATA_TYPE_OPTIONS}
                        onChange={(_, opt) => {
                          if (opt) {
                            setDataType(opt.key as string);
                            if (opt.key !== 'date') {
                              setAllowCustomText(false);
                              setAllowDropdown(false);
                              setDropdownOpts(['']);
                            }
                          }
                        }}
                        styles={{ dropdown: { width: 160 } }}
                      />
                    </Stack>

                    {/* Date-specific options — stacked checkboxes, inline builder */}
                    {dataType === 'date' && (
                      <Stack tokens={{ childrenGap: 8 }}>
                        <Checkbox
                          label="Allow custom text"
                          checked={allowCustomText}
                          onChange={(_, c) => setAllowCustomText(!!c)}
                        />
                        <Stack tokens={{ childrenGap: 6 }}>
                          <Checkbox
                            label="Allow dropdown options"
                            checked={allowDropdown}
                            onChange={(_, c) => {
                              setAllowDropdown(!!c);
                              if (!c) setDropdownOpts(['']);
                            }}
                          />
                          {allowDropdown && (
                            <div className={classNames.optionBuilderIndent}>
                              <OptionBuilder options={dropdownOpts} onChange={setDropdownOpts} />
                            </div>
                          )}
                        </Stack>
                      </Stack>
                    )}
                  </Stack>
                </Stack>

                <Stack tokens={{ childrenGap: 6 }}>
                  <Label>Description</Label>
                  <TextField
                    placeholder="Enter description of this bookmark here"
                    styles={{ root: { maxWidth: 500 } }}
                  />
                </Stack>

                <Stack horizontal tokens={{ childrenGap: 32 }}>
                  <Checkbox label="Mandatory field" />
                  <Checkbox label="Add validations" />
                </Stack>
              </Stack>
            </div>
          </Stack.Item>

          {dataType === 'date' && (
            <UserPreview
              fieldLabel="Start date"
              allowCustomText={allowCustomText}
              dropdownOpts={allowDropdown ? dropdownOpts : []}
            />
          )}
        </Stack>
      </Stack>
    </div>
  );
};
