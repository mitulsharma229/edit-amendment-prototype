import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { TextField } from '@fluentui/react/lib/TextField';
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { IconButton } from '@fluentui/react/lib/Button';
import { Label } from '@fluentui/react/lib/Label';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Icon } from '@fluentui/react/lib/Icon';
import { useTheme, ITheme } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/merge-styles';
import { memoizeFunction } from '@fluentui/utilities';

const LOCALE_OPTIONS: IDropdownOption[] = [
  { key: 'en-us', text: 'English (United States)' },
  { key: 'en-gb', text: 'English (United Kingdom)' },
  { key: 'de-de', text: 'German (Germany)' },
  { key: 'fr-fr', text: 'French (France)' },
  { key: 'ja-jp', text: 'Japanese (Japan)' },
];

interface ITableRow {
  discountPct: string;
  beginDate: Date | undefined;
  endDate: Date | undefined;
  enrollmentId: string;
}

const createEmptyRow = (): ITableRow => ({
  discountPct: '',
  beginDate: undefined,
  endDate: undefined,
  enrollmentId: '',
});

const validateEnrollmentId = (value: string): string | undefined => {
  if (!value) return undefined;
  if (value.toLowerCase() === 'new') return undefined;
  if (/^\d+$/.test(value)) return undefined;
  return 'Invalid input. Add a numerical enrollment ID. If the ID is new, add "New"';
};

const getClassNames = memoizeFunction((theme: ITheme) =>
  mergeStyleSets({
    root: {
      width: '100%',
      height: 'calc(100vh - 44px)',
      display: 'flex',
      flexDirection: 'column' as const,
      backgroundColor: theme.semanticColors.bodyBackground,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 32px 16px',
      borderBottom: `1px solid ${theme.palette.neutralLight}`,
      flexShrink: 0,
    },
    headerTitle: {
      ...theme.fonts.xLarge,
      fontWeight: 600,
    },
    body: {
      display: 'flex',
      flex: 1,
      overflow: 'hidden' as const,
    },
    previewRail: {
      width: 60,
      borderRight: `1px solid ${theme.palette.neutralLight}`,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      paddingTop: 16,
      flexShrink: 0,
      backgroundColor: theme.semanticColors.bodyBackground,
    },
    previewIconWrap: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: 4,
      cursor: 'pointer',
      padding: 8,
      color: theme.palette.neutralPrimary,
    },
    previewLabel: {
      fontSize: 11,
      color: theme.palette.neutralSecondary,
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'auto' as const,
      padding: '0 40px',
    },
    topPivot: { paddingTop: 8 },
    formSection: { paddingTop: 32 },
    subPivot: { marginTop: 32 },
    tabContent: { paddingTop: 24 },
    tableSection: {
      marginTop: 16,
    },
    tableTitleRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer',
      padding: '8px 0',
    },
    rowCountBar: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '12px 0',
    },
    rowCountInput: {
      width: 48,
    },
    addButton: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: theme.palette.neutralSecondary,
      fontSize: 13,
      padding: 0,
    },
    tableHeaderRow: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.palette.neutralLighterAlt,
      borderTop: `1px solid ${theme.palette.neutralLight}`,
      borderBottom: `1px solid ${theme.palette.neutralLight}`,
    },
    tableHeaderCell: {
      flex: 1,
      padding: '8px 12px',
      fontSize: 12,
      fontWeight: 600,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    deleteCol: {
      width: 40,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tableInputRow: {
      display: 'flex',
      alignItems: 'flex-start',
      borderBottom: `1px solid ${theme.palette.neutralLight}`,
    },
    tableInputCell: {
      flex: 1,
      padding: '8px 12px',
    },
    enrollmentIdDescription: {
      fontSize: 11,
      color: theme.palette.neutralSecondary,
      marginTop: 4,
    },
  })
);

export const Requirement3Page: React.FC = () => {
  const theme = useTheme();
  const classNames = getClassNames(theme);

  const [selectedLocale, setSelectedLocale] = React.useState('en-us');
  const [activeTab, setActiveTab] = React.useState('fieldsAndTables');
  const [activeSubTab, setActiveSubTab] = React.useState('tables');
  const [isTableExpanded, setIsTableExpanded] = React.useState(true);
  const [rows, setRows] = React.useState<ITableRow[]>([createEmptyRow()]);

  const updateRow = (index: number, patch: Partial<ITableRow>) => {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  };

  const addRow = () => {
    setRows((prev) => [...prev, createEmptyRow()]);
  };

  const deleteRow = (index: number) => {
    setRows((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div className={classNames.root}>
      {/* Header */}
      <div className={classNames.header}>
        <Text className={classNames.headerTitle}>Edit amendment</Text>
        <IconButton
          iconProps={{ iconName: 'Cancel' }}
          ariaLabel="Close"
          styles={{
            root: { color: theme.palette.neutralPrimary },
            rootHovered: { color: theme.palette.neutralDark },
          }}
        />
      </div>

      {/* Body */}
      <div className={classNames.body}>
        {/* Preview Rail */}
        <div className={classNames.previewRail}>
          <div className={classNames.previewIconWrap}>
            <Icon iconName="EntryView" styles={{ root: { fontSize: 20 } }} />
            <Text className={classNames.previewLabel}>Preview</Text>
          </div>
        </div>

        {/* Content */}
        <div className={classNames.content}>
          <div className={classNames.topPivot}>
            <Pivot
              selectedKey={activeTab}
              onLinkClick={(item) => {
                if (item?.props.itemKey) setActiveTab(item.props.itemKey);
              }}
            >
              <PivotItem headerText="Edit Fields and tables" itemKey="fieldsAndTables" />
              <PivotItem headerText="Edit Content" itemKey="editContent" />
            </Pivot>
          </div>

          {activeTab === 'fieldsAndTables' && (
            <div className={classNames.formSection}>
              <Stack tokens={{ childrenGap: 6 }}>
                <Label required>Number & Date Format</Label>
                <Dropdown
                  selectedKey={selectedLocale}
                  options={LOCALE_OPTIONS}
                  onChange={(_, opt) => { if (opt) setSelectedLocale(opt.key as string); }}
                  styles={{ dropdown: { maxWidth: 300 } }}
                />
              </Stack>

              <div className={classNames.subPivot}>
                <Pivot
                  selectedKey={activeSubTab}
                  onLinkClick={(item) => {
                    if (item?.props.itemKey) setActiveSubTab(item.props.itemKey);
                  }}
                >
                  <PivotItem headerText="Fields" itemKey="fields" />
                  <PivotItem headerText="Tables" itemKey="tables" />
                </Pivot>
              </div>

              {activeSubTab === 'fields' && (
                <div className={classNames.tabContent}>
                  <Text styles={{ root: { color: theme.palette.neutralSecondary } }}>
                    Fields configuration will appear here.
                  </Text>
                </div>
              )}

              {activeSubTab === 'tables' && (
                <div className={classNames.tabContent}>
                  <div className={classNames.tableSection}>
                    {/* Table title */}
                    <div className={classNames.tableTitleRow} onClick={() => setIsTableExpanded(!isTableExpanded)}>
                      <Icon
                        iconName={isTableExpanded ? 'ChevronUp' : 'ChevronDown'}
                        styles={{ root: { fontSize: 12, color: theme.palette.neutralSecondary } }}
                      />
                      <Text styles={{ root: { fontWeight: 600, fontSize: 14 } }}>Azure Commitment Discount Table</Text>
                    </div>

                    {isTableExpanded && (
                      <>
                        {/* Row count + Add */}
                        <div className={classNames.rowCountBar}>
                          <TextField
                            value={String(rows.length)}
                            readOnly
                            styles={{
                              root: { width: 48 },
                              fieldGroup: { height: 28 },
                              field: { fontSize: 13, textAlign: 'center' },
                            }}
                          />
                          <button className={classNames.addButton} onClick={addRow}>
                            <Icon iconName="Add" styles={{ root: { fontSize: 12 } }} />
                            <span>Add</span>
                          </button>
                        </div>

                        {/* Table header */}
                        <div className={classNames.tableHeaderRow}>
                          <div className={classNames.tableHeaderCell}>Discount Percentage</div>
                          <div className={classNames.tableHeaderCell}>Begin Date</div>
                          <div className={classNames.tableHeaderCell}>End Date</div>
                          <div className={classNames.tableHeaderCell}>Enrollment ID</div>
                          <div className={classNames.deleteCol} />
                        </div>

                        {/* Table rows */}
                        {rows.map((row, idx) => (
                          <div key={idx} className={classNames.tableInputRow}>
                            <div className={classNames.tableInputCell}>
                              <TextField
                                placeholder="Enter your value here"
                                value={row.discountPct}
                                onChange={(_, val) => updateRow(idx, { discountPct: val || '' })}
                              />
                            </div>
                            <div className={classNames.tableInputCell}>
                              <DatePicker
                                placeholder="Select date(UTC)"
                                value={row.beginDate}
                                onSelectDate={(date) => updateRow(idx, { beginDate: date || undefined })}
                                formatDate={(date) => date ? date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}
                              />
                            </div>
                            <div className={classNames.tableInputCell}>
                              <DatePicker
                                placeholder="Select date(UTC)"
                                value={row.endDate}
                                onSelectDate={(date) => updateRow(idx, { endDate: date || undefined })}
                                formatDate={(date) => date ? date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}
                              />
                            </div>
                            <div className={classNames.tableInputCell}>
                              <TextField
                                placeholder="Enter enrollment ID"
                                value={row.enrollmentId}
                                onChange={(_, val) => updateRow(idx, { enrollmentId: val || '' })}
                                errorMessage={validateEnrollmentId(row.enrollmentId)}
                              />
                              {!validateEnrollmentId(row.enrollmentId) && (
                                <Text className={classNames.enrollmentIdDescription}>
                                  If you don't have the enrollment ID, input 'New'
                                </Text>
                              )}
                            </div>
                            <div className={classNames.deleteCol}>
                              <IconButton
                                iconProps={{ iconName: 'Delete' }}
                                ariaLabel="Delete row"
                                disabled={rows.length <= 1}
                                styles={{
                                  root: { color: theme.palette.neutralTertiary },
                                  rootHovered: { color: theme.palette.redDark },
                                }}
                                onClick={() => deleteRow(idx)}
                              />
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'editContent' && (
            <div className={classNames.formSection}>
              <Text styles={{ root: { color: theme.palette.neutralSecondary } }}>
                Content editing allows you to modify the amendment text directly.
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
