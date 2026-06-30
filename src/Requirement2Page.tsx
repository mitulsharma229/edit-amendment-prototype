import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { ComboBox, IComboBoxOption } from '@fluentui/react/lib/ComboBox';
import { TextField } from '@fluentui/react/lib/TextField';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Calendar } from '@fluentui/react/lib/Calendar';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { IconButton, ActionButton } from '@fluentui/react/lib/Button';
import { Label } from '@fluentui/react/lib/Label';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Icon } from '@fluentui/react/lib/Icon';
import { useTheme, ITheme } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/merge-styles';
import { memoizeFunction } from '@fluentui/utilities';

interface IBookmarkConfig {
  fieldLabel: string;
  dataType: string;
  description: string;
  isMandatory: boolean;
  addValidations: boolean;
  allowCustomText: boolean;
  allowDropdownOptions: boolean;
  dropdownOptions: string[];
}

const DATA_TYPE_OPTIONS: IDropdownOption[] = [
  { key: 'text', text: 'Text' },
  { key: 'date', text: 'Date' },
  { key: 'number', text: 'Number' },
];

const LOCALE_OPTIONS: IDropdownOption[] = [
  { key: 'en-us', text: 'English (United States)' },
  { key: 'en-gb', text: 'English (United Kingdom)' },
  { key: 'de-de', text: 'German (Germany)' },
  { key: 'fr-fr', text: 'French (France)' },
  { key: 'ja-jp', text: 'Japanese (Japan)' },
];

const getClassNames = memoizeFunction((theme: ITheme) =>
  mergeStyleSets({
    root: {
      width: '100%',
      height: 'calc(100vh - 44px)',
      display: 'flex',
      flexDirection: 'column' as const,
      backgroundColor: '#f3f2f1',
      position: 'relative' as const,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 24px',
      backgroundColor: '#1e1e1e',
      color: theme.palette.white,
      flexShrink: 0,
    },
    headerTitle: {
      color: theme.palette.white,
      fontSize: 14,
      fontWeight: 400,
    },
    stepper: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '14px 24px',
      backgroundColor: theme.palette.white,
      borderBottom: `1px solid ${theme.palette.neutralLight}`,
      flexShrink: 0,
    },
    stepDot: { width: 10, height: 10, borderRadius: '50%' },
    stepActive: { backgroundColor: '#107C10' },
    stepInactive: { backgroundColor: theme.palette.neutralTertiaryAlt },
    stepText: { fontSize: 12, color: theme.palette.neutralSecondary },
    stepTextActive: { fontSize: 12, color: '#107C10', fontWeight: 600 },
    stepChevron: { fontSize: 10, color: theme.palette.neutralTertiaryAlt },
    languageBar: {
      padding: '10px 24px',
      backgroundColor: theme.palette.white,
      borderBottom: `1px solid ${theme.palette.neutralLight}`,
      flexShrink: 0,
    },
    body: {
      display: 'flex',
      flex: 1,
      overflow: 'hidden' as const,
    },
    previewRail: {
      width: 56,
      borderRight: `1px solid ${theme.palette.neutralLight}`,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      paddingTop: 14,
      flexShrink: 0,
      backgroundColor: theme.palette.white,
    },
    previewIconWrap: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: 2,
      cursor: 'pointer',
      padding: 6,
      color: theme.palette.neutralPrimary,
    },
    previewLabel: { fontSize: 9, color: theme.palette.neutralSecondary },
    content: {
      flex: 1,
      overflow: 'auto' as const,
      padding: '28px 32px',
    },
    bookmarkCard: {
      backgroundColor: theme.palette.white,
      border: `1px solid ${theme.palette.neutralLight}`,
      borderRadius: 4,
      padding: '24px 28px',
      marginBottom: 20,
    },
    bookmarkNumber: {
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
    bookmarkTitle: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.palette.neutralPrimary,
    },
    fieldLabelInput: {
      backgroundColor: theme.palette.neutralLighter,
      border: `1px solid ${theme.palette.neutralLight}`,
      borderRadius: 2,
      padding: '6px 12px',
      fontSize: 13,
      color: theme.palette.neutralSecondary,
      width: 180,
    },
    fab: {
      position: 'fixed' as const,
      bottom: 28,
      right: 28,
      zIndex: 1000,
      backgroundColor: '#6B2FA0',
      color: '#ffffff',
      border: 'none',
      borderRadius: 24,
      padding: '12px 24px',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: '0 4px 16px rgba(107, 47, 160, 0.45)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
      ':hover': {
        backgroundColor: '#5A2589',
        boxShadow: '0 6px 20px rgba(107, 47, 160, 0.6)',
      },
    },
    panelBody: {
      display: 'flex',
      flex: 1,
      overflow: 'hidden' as const,
    },
    panelPreviewRail: {
      width: 56,
      borderRight: `1px solid ${theme.palette.neutralLight}`,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      paddingTop: 16,
      flexShrink: 0,
    },
    panelContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'auto' as const,
      padding: '0 32px',
    },
    panelTopPivot: { paddingTop: 8 },
    panelFormSection: { paddingTop: 24 },
    panelSubPivot: { marginTop: 24 },
    panelTabContent: { paddingTop: 24 },
    tableCard: {
      backgroundColor: theme.palette.white,
      border: `1px solid ${theme.palette.neutralLight}`,
      borderRadius: 4,
      marginBottom: 20,
    },
    tableCardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '12px 16px',
      borderBottom: `1px solid ${theme.palette.neutralLight}`,
      cursor: 'pointer',
    },
    tableHeaderRow: {
      display: 'flex',
      backgroundColor: theme.palette.neutralLighterAlt,
      borderBottom: `1px solid ${theme.palette.neutralLight}`,
    },
    tableHeaderCell: {
      padding: '8px 12px',
      fontSize: 12,
      fontWeight: 600,
      color: theme.palette.neutralPrimary,
      flex: 1,
    },
    tableInputRow: {
      display: 'flex',
      borderBottom: `1px solid ${theme.palette.neutralLight}`,
    },
    tableInputCell: {
      padding: '8px 12px',
      flex: 1,
      position: 'relative' as const,
    },
    optionBuilderIndent: {
      borderLeft: `3px solid ${theme.palette.themePrimary}`,
      paddingLeft: 16,
    },
  })
);

const BookmarkConfig: React.FC<{
  index: number;
  bookmarkId: string;
  config: IBookmarkConfig;
  onChange: (config: IBookmarkConfig) => void;
}> = ({ index, bookmarkId, config, onChange }) => {
  const theme = useTheme();
  const classNames = getClassNames(theme);

  return (
    <div className={classNames.bookmarkCard}>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 12 }} styles={{ root: { marginBottom: 20 } }}>
        <div className={classNames.bookmarkNumber}>{index}</div>
        <Text className={classNames.bookmarkTitle}>Bookmark - {bookmarkId} (TextBox)</Text>
      </Stack>

      <Stack horizontal tokens={{ childrenGap: 32 }} styles={{ root: { marginBottom: 16 } }}>
        <Stack tokens={{ childrenGap: 6 }}>
          <Label>Field Label</Label>
          <TextField
            value={config.fieldLabel}
            onChange={(_, val) => onChange({ ...config, fieldLabel: val || '' })}
            styles={{
              root: { width: 200 },
              fieldGroup: { backgroundColor: theme.palette.neutralLighter },
            }}
          />
        </Stack>

        <Stack tokens={{ childrenGap: 10 }} styles={{ root: { alignItems: 'flex-start' } }}>
          <Stack tokens={{ childrenGap: 6 }}>
            <Label required>Data Type</Label>
            <Dropdown
              selectedKey={config.dataType}
              options={DATA_TYPE_OPTIONS}
              onChange={(_, opt) => {
                if (opt) {
                  onChange({
                    ...config,
                    dataType: opt.key as string,
                    allowCustomText: false,
                    allowDropdownOptions: false,
                    dropdownOptions: [],
                  });
                }
              }}
              styles={{ dropdown: { width: 140 } }}
            />
          </Stack>

          {config.dataType === 'date' && (
            <Stack tokens={{ childrenGap: 8 }}>
              <Checkbox
                label="Allow custom text"
                checked={config.allowCustomText}
                onChange={(_, checked) => onChange({ ...config, allowCustomText: !!checked })}
              />
              <Stack tokens={{ childrenGap: 6 }}>
                <Checkbox
                  label="Allow dropdown options"
                  checked={config.allowDropdownOptions}
                  onChange={(_, checked) => onChange({
                    ...config,
                    allowDropdownOptions: !!checked,
                    dropdownOptions: checked ? (config.dropdownOptions.length > 0 ? config.dropdownOptions : ['']) : [],
                  })}
                />
                {config.allowDropdownOptions && (
                  <div className={classNames.optionBuilderIndent}>
                    <Stack tokens={{ childrenGap: 8 }}>
                      {(config.dropdownOptions.length === 0 ? [''] : config.dropdownOptions).map((opt, i) => (
                        <Stack key={i} horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                          <Stack.Item grow={1}>
                            <TextField
                              placeholder={`Option ${i + 1}`}
                              value={opt}
                              onChange={(_, val) => {
                                const next = [...config.dropdownOptions];
                                next[i] = val || '';
                                onChange({ ...config, dropdownOptions: next });
                              }}
                            />
                          </Stack.Item>
                          <IconButton
                            iconProps={{ iconName: 'Delete' }}
                            ariaLabel={`Remove option ${i + 1}`}
                            title="Remove option"
                            styles={{ root: { color: theme.palette.neutralSecondary } }}
                            onClick={() => onChange({ ...config, dropdownOptions: config.dropdownOptions.filter((_, j) => j !== i) })}
                          />
                        </Stack>
                      ))}
                      <ActionButton
                        iconProps={{ iconName: 'Add' }}
                        text="Add option"
                        styles={{ root: { paddingLeft: 0, height: 32 } }}
                        onClick={() => onChange({ ...config, dropdownOptions: [...config.dropdownOptions, ''] })}
                      />
                    </Stack>
                  </div>
                )}
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>

      <Stack tokens={{ childrenGap: 6 }} styles={{ root: { marginBottom: 16 } }}>
        <Label>Description</Label>
        <TextField
          placeholder="Enter description of this bookmark here"
          value={config.description}
          onChange={(_, val) => onChange({ ...config, description: val || '' })}
          styles={{ root: { maxWidth: 500 } }}
        />
      </Stack>

      <Stack horizontal tokens={{ childrenGap: 32 }}>
        <Checkbox
          label="Mandatory field"
          checked={config.isMandatory}
          onChange={(_, checked) => onChange({ ...config, isMandatory: !!checked })}
        />
        <Checkbox
          label="Add validations"
          checked={config.addValidations}
          onChange={(_, checked) => onChange({ ...config, addValidations: !!checked })}
        />
      </Stack>
    </div>
  );
};

export const Requirement2Page: React.FC = () => {
  const theme = useTheme();
  const classNames = getClassNames(theme);
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);

  const [bookmarks, setBookmarks] = React.useState<IBookmarkConfig[]>([
    { fieldLabel: 'Start date', dataType: 'date', description: '', isMandatory: false, addValidations: false, allowCustomText: false, allowDropdownOptions: false, dropdownOptions: [] },
    { fieldLabel: 'End Date', dataType: 'date', description: '', isMandatory: false, addValidations: false, allowCustomText: false, allowDropdownOptions: false, dropdownOptions: [] },
    { fieldLabel: 'Discount %', dataType: 'number', description: '', isMandatory: false, addValidations: false, allowCustomText: false, allowDropdownOptions: false, dropdownOptions: [] },
  ]);

  const bookmarkIds = ['H01_S05_01', 'H01_S05_02', 'H01_S05_03'];

  const handleBookmarkChange = (index: number, config: IBookmarkConfig) => {
    setBookmarks((prev) => prev.map((b, i) => (i === index ? config : b)));
  };

  // Panel state
  const [panelLocale, setPanelLocale] = React.useState('en-us');
  const [panelTab, setPanelTab] = React.useState('fieldsAndTables');
  const [panelSubTab, setPanelSubTab] = React.useState('tables');
  const [isTableExpanded, setIsTableExpanded] = React.useState(true);

  const [discountPct, setDiscountPct] = React.useState('');
  const [enrollmentIdText, setEnrollmentIdText] = React.useState('');

  const startDateCellRef = React.useRef<HTMLDivElement>(null);
  const endDateCellRef = React.useRef<HTMLDivElement>(null);
  const [showStartCalendar, setShowStartCalendar] = React.useState(false);
  const [showEndCalendar, setShowEndCalendar] = React.useState(false);

  type DateCellMode = 'dropdown' | 'selectDate' | 'custom' | 'preset';
  const [startDateMode, setStartDateMode] = React.useState<DateCellMode>('dropdown');
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [startCustomText, setStartCustomText] = React.useState('');
  const [startPresetKey, setStartPresetKey] = React.useState('');

  const [endDateMode, setEndDateMode] = React.useState<DateCellMode>('dropdown');
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);
  const [endCustomText, setEndCustomText] = React.useState('');
  const [endPresetKey, setEndPresetKey] = React.useState('');

  const formatDate = (d: Date) => d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const getStartDateOptions = (): IComboBoxOption[] => {
    const opts: IComboBoxOption[] = [{ key: 'select-date', text: 'Select date' }];
    if (bookmarks[0].allowCustomText) opts.push({ key: 'custom', text: 'Add custom text' });
    const valid = bookmarks[0].dropdownOptions.filter(o => o.trim());
    if (bookmarks[0].allowDropdownOptions && valid.length > 0) {
      opts.push({ key: 'divider1', text: '-', itemType: 1 });
      opts.push({ key: 'header1', text: 'Or select an option', itemType: 2 });
      valid.forEach((o, i) => opts.push({ key: `start-opt-${i}`, text: o }));
    }
    return opts;
  };

  const getEndDateOptions = (): IComboBoxOption[] => {
    const opts: IComboBoxOption[] = [{ key: 'select-date', text: 'Select date' }];
    if (bookmarks[1].allowCustomText) opts.push({ key: 'custom', text: 'Add custom text' });
    const valid = bookmarks[1].dropdownOptions.filter(o => o.trim());
    if (bookmarks[1].allowDropdownOptions && valid.length > 0) {
      opts.push({ key: 'divider1', text: '-', itemType: 1 });
      opts.push({ key: 'header1', text: 'Or select an option', itemType: 2 });
      valid.forEach((o, i) => opts.push({ key: `end-opt-${i}`, text: o }));
    }
    return opts;
  };

  const getStartDateText = (): string | undefined => {
    if (startDateMode === 'selectDate') return startDate ? formatDate(startDate) : undefined;
    if (startDateMode === 'custom') return startCustomText;
    return undefined;
  };

  const getStartDateSelectedKey = (): string | undefined => {
    if (startDateMode === 'selectDate' && !startDate) return 'select-date';
    if (startDateMode === 'preset') return startPresetKey;
    return undefined;
  };

  const getEndDateText = (): string | undefined => {
    if (endDateMode === 'selectDate') return endDate ? formatDate(endDate) : undefined;
    if (endDateMode === 'custom') return endCustomText;
    return undefined;
  };

  const getEndDateSelectedKey = (): string | undefined => {
    if (endDateMode === 'selectDate' && !endDate) return 'select-date';
    if (endDateMode === 'preset') return endPresetKey;
    return undefined;
  };

  const handleStartDateChange = (_: React.FormEvent<unknown>, option?: IComboBoxOption, _idx?: number, value?: string) => {
    if (option) {
      const key = option.key as string;
      if (key === 'select-date') {
        setStartDateMode('selectDate');
        setStartDate(undefined);
        setShowStartCalendar(true);
      } else if (key === 'custom') {
        setStartDateMode('custom');
        setStartCustomText('');
      } else {
        setStartDateMode('preset');
        setStartPresetKey(key);
      }
    } else if (value !== undefined && startDateMode === 'custom') {
      setStartCustomText(value);
    }
  };

  const handleEndDateChange = (_: React.FormEvent<unknown>, option?: IComboBoxOption, _idx?: number, value?: string) => {
    if (option) {
      const key = option.key as string;
      if (key === 'select-date') {
        setEndDateMode('selectDate');
        setEndDate(undefined);
        setShowEndCalendar(true);
      } else if (key === 'custom') {
        setEndDateMode('custom');
        setEndCustomText('');
      } else {
        setEndDateMode('preset');
        setEndPresetKey(key);
      }
    } else if (value !== undefined && endDateMode === 'custom') {
      setEndCustomText(value);
    }
  };

  return (
    <div className={classNames.root}>
      {/* Dark header */}
      <div className={classNames.header}>
        <Text className={classNames.headerTitle}>
          Digitize amendment - (N255 - N255 : Special Discounting Schedule and Coverage Commitme...)
        </Text>
        <IconButton
          iconProps={{ iconName: 'Cancel' }}
          ariaLabel="Close"
          styles={{
            root: { color: theme.palette.white },
            rootHovered: { color: theme.palette.neutralLighter, backgroundColor: 'transparent' },
          }}
        />
      </div>

      {/* Stepper */}
      <div className={classNames.stepper}>
        <div className={`${classNames.stepDot} ${classNames.stepActive}`} />
        <Text className={classNames.stepText}>Choose method</Text>
        <Icon iconName="ChevronRight" className={classNames.stepChevron} />
        <div className={`${classNames.stepDot} ${classNames.stepActive}`} />
        <Text className={classNames.stepTextActive}>Configure</Text>
        <Icon iconName="ChevronRight" className={classNames.stepChevron} />
        <div className={`${classNames.stepDot} ${classNames.stepInactive}`} />
        <Text className={classNames.stepText}>Review and Confirm</Text>
      </div>

      {/* Language bar */}
      <div className={classNames.languageBar}>
        <Stack tokens={{ childrenGap: 2 }}>
          <Text styles={{ root: { fontSize: 11, color: theme.palette.neutralSecondary } }}>Language</Text>
          <Text styles={{ root: { fontSize: 12, fontWeight: 600 } }}>ENG</Text>
        </Stack>
      </div>

      {/* Body */}
      <div className={classNames.body}>
        <div className={classNames.previewRail}>
          <div className={classNames.previewIconWrap}>
            <Icon iconName="EntryView" styles={{ root: { fontSize: 18 } }} />
            <Text className={classNames.previewLabel}>Preview</Text>
          </div>
        </div>

        <div className={classNames.content}>
          {bookmarks.map((config, idx) => (
            <BookmarkConfig
              key={bookmarkIds[idx]}
              index={idx + 1}
              bookmarkId={bookmarkIds[idx]}
              config={config}
              onChange={(c) => handleBookmarkChange(idx, c)}
            />
          ))}
        </div>
      </div>

      {/* FAB */}
      <button
        className={classNames.fab}
        onClick={() => {
          setPanelLocale('en-us');
          setPanelTab('fieldsAndTables');
          setPanelSubTab('tables');
          setIsTableExpanded(true);
          setIsPanelOpen(true);
        }}
      >
        <Icon iconName="EditNote" styles={{ root: { fontSize: 16, color: '#ffffff' } }} />
        Go to Edit Amendment
      </button>

      {/* Edit Amendment Panel */}
      <Panel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        type={PanelType.custom}
        customWidth="75vw"
        headerText="Edit amendment"
        isLightDismiss
        styles={{
          main: { display: 'flex', flexDirection: 'column' },
          content: { padding: 0, display: 'flex', flexDirection: 'column', flex: 1 },
          scrollableContent: { display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' },
        }}
      >
        <div className={classNames.panelBody}>
          <div className={classNames.panelPreviewRail}>
            <Stack horizontalAlign="center" tokens={{ childrenGap: 4 }}>
              <Icon iconName="EntryView" styles={{ root: { fontSize: 20, color: theme.palette.neutralPrimary } }} />
              <Text styles={{ root: { fontSize: 11, color: theme.palette.neutralSecondary } }}>Preview</Text>
            </Stack>
          </div>

          <div className={classNames.panelContent}>
            <div className={classNames.panelTopPivot}>
              <Pivot
                selectedKey={panelTab}
                onLinkClick={(item) => {
                  if (item?.props.itemKey) setPanelTab(item.props.itemKey);
                }}
              >
                <PivotItem headerText="Edit Fields and tables" itemKey="fieldsAndTables" />
                <PivotItem headerText="Edit Content" itemKey="editContent" />
              </Pivot>
            </div>

            {panelTab === 'fieldsAndTables' && (
              <div className={classNames.panelFormSection}>
                <Stack tokens={{ childrenGap: 6 }}>
                  <Label required>Number & Date Format</Label>
                  <Dropdown
                    selectedKey={panelLocale}
                    options={LOCALE_OPTIONS}
                    onChange={(_, opt) => { if (opt) setPanelLocale(opt.key as string); }}
                    styles={{ dropdown: { maxWidth: 300 } }}
                  />
                </Stack>

                <div className={classNames.panelSubPivot}>
                  <Pivot
                    selectedKey={panelSubTab}
                    onLinkClick={(item) => {
                      if (item?.props.itemKey) setPanelSubTab(item.props.itemKey);
                    }}
                  >
                    <PivotItem headerText="Fields" itemKey="fields" />
                    <PivotItem headerText="Tables" itemKey="tables" />
                  </Pivot>
                </div>

                {panelSubTab === 'fields' && (
                  <div className={classNames.panelTabContent}>
                    <Text styles={{ root: { color: theme.palette.neutralSecondary } }}>
                      Fields configuration will appear here.
                    </Text>
                  </div>
                )}

                {panelSubTab === 'tables' && (
                  <div className={classNames.panelTabContent}>
                    {/* Azure Commitment Discount Table */}
                    <div className={classNames.tableCard}>
                      <div className={classNames.tableCardHeader} onClick={() => setIsTableExpanded(!isTableExpanded)}>
                        <Icon
                          iconName={isTableExpanded ? 'ChevronDown' : 'ChevronRight'}
                          styles={{ root: { fontSize: 10 } }}
                        />
                        <Text styles={{ root: { fontWeight: 600, fontSize: 13 } }}>Azure Commitment Discount Table</Text>
                      </div>

                      {isTableExpanded && (
                        <>
                          {/* Table header */}
                          <div className={classNames.tableHeaderRow}>
                            <div className={classNames.tableHeaderCell}>Discount Percentage</div>
                            <div className={classNames.tableHeaderCell}>Start Date</div>
                            <div className={classNames.tableHeaderCell}>End Date</div>
                            <div className={classNames.tableHeaderCell}>Enrollment ID</div>
                          </div>

                          {/* Table input row */}
                          <div className={classNames.tableInputRow}>
                            {/* Discount Percentage */}
                            <div className={classNames.tableInputCell}>
                              <TextField
                                placeholder="Enter value"
                                value={discountPct}
                                onChange={(_, val) => setDiscountPct(val || '')}
                                styles={{ root: { width: '100%' } }}
                              />
                            </div>

                            {/* Start Date cell */}
                            <div className={classNames.tableInputCell} ref={startDateCellRef}>
                              <ComboBox
                                placeholder={startDateMode === 'custom' ? 'Input text' : 'Select date'}
                                text={getStartDateText()}
                                selectedKey={getStartDateSelectedKey()}
                                options={getStartDateOptions()}
                                allowFreeform={startDateMode === 'custom'}
                                autoComplete="off"
                                onChange={handleStartDateChange}
                                onPendingValueChanged={(_opt, _idx, value) => {
                                  if (startDateMode === 'custom' && value !== undefined) {
                                    setStartCustomText(value);
                                  }
                                }}
                                styles={{ root: { width: '100%' } }}
                              />
                              {showStartCalendar && (
                                <Callout
                                  target={startDateCellRef.current}
                                  onDismiss={() => setShowStartCalendar(false)}
                                  directionalHint={DirectionalHint.bottomLeftEdge}
                                  isBeakVisible={false}
                                >
                                  <Calendar
                                    value={startDate}
                                    onSelectDate={(date) => {
                                      setStartDate(date);
                                      setShowStartCalendar(false);
                                    }}
                                  />
                                </Callout>
                              )}
                            </div>

                            {/* End Date cell */}
                            <div className={classNames.tableInputCell} ref={endDateCellRef}>
                              <ComboBox
                                placeholder={endDateMode === 'custom' ? 'Input text' : 'Select date'}
                                text={getEndDateText()}
                                selectedKey={getEndDateSelectedKey()}
                                options={getEndDateOptions()}
                                allowFreeform={endDateMode === 'custom'}
                                autoComplete="off"
                                onChange={handleEndDateChange}
                                onPendingValueChanged={(_opt, _idx, value) => {
                                  if (endDateMode === 'custom' && value !== undefined) {
                                    setEndCustomText(value);
                                  }
                                }}
                                styles={{ root: { width: '100%' } }}
                              />
                              {showEndCalendar && (
                                <Callout
                                  target={endDateCellRef.current}
                                  onDismiss={() => setShowEndCalendar(false)}
                                  directionalHint={DirectionalHint.bottomLeftEdge}
                                  isBeakVisible={false}
                                >
                                  <Calendar
                                    value={endDate}
                                    onSelectDate={(date) => {
                                      setEndDate(date);
                                      setShowEndCalendar(false);
                                    }}
                                  />
                                </Callout>
                              )}
                            </div>

                            {/* Enrollment ID */}
                            <div className={classNames.tableInputCell}>
                              <TextField
                                placeholder="Enter enrollment ID"
                                value={enrollmentIdText}
                                onChange={(_, val) => setEnrollmentIdText(val || '')}
                                styles={{ root: { width: '100%' } }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {panelTab === 'editContent' && (
              <div className={classNames.panelFormSection}>
                <Text styles={{ root: { color: theme.palette.neutralSecondary } }}>
                  Content editing allows you to modify the amendment text directly.
                </Text>
              </div>
            )}
          </div>
        </div>
      </Panel>
    </div>
  );
};
