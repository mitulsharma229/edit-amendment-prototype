import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { TextField } from '@fluentui/react/lib/TextField';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { IconButton } from '@fluentui/react/lib/Button';
import { Label } from '@fluentui/react/lib/Label';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Icon } from '@fluentui/react/lib/Icon';
import { Separator } from '@fluentui/react/lib/Separator';
import { useTheme, ITheme } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/merge-styles';
import { memoizeFunction } from '@fluentui/utilities';

const JAPANESE_OPTIONS: IDropdownOption[] = [
  { key: 'jp-enterprise', text: 'エンタープライズ加入契約' },
  { key: 'jp-server-cloud', text: 'サーバーおよびクラウド加入契約' },
  { key: 'jp-enterprise-sub', text: 'エンタープライズサブスクリプション契約' },
  { key: 'jp-education', text: '教育ソリューション加入契約' },
  { key: 'jp-school-sub', text: '学校サブスクリプション加入契約' },
];

const ENGLISH_OPTIONS: IDropdownOption[] = [
  { key: 'enterprise', text: 'Enterprise Enrollment' },
  { key: 'server-cloud', text: 'Server and Cloud Enrollment' },
  { key: 'enterprise-sub', text: 'Enterprise Subscription Enrollment' },
  { key: 'education', text: 'Enrollment for Education Solutions' },
  { key: 'school-sub', text: 'School Subscription Enrollment' },
];

const ROW_KEYS = ['1', '2', '3', '4', '5'];

const LOCALE_OPTIONS: IDropdownOption[] = [
  { key: 'en-us', text: 'English (United States)' },
  { key: 'en-gb', text: 'English (United Kingdom)' },
  { key: 'de-de', text: 'German (Germany)' },
  { key: 'fr-fr', text: 'French (France)' },
  { key: 'ja-jp', text: 'Japanese (Japan)' },
];

const TENANT_OPTIONS: IDropdownOption[] = [
  { key: 'contoso-main', text: 'Contoso Main Tenant' },
  { key: 'contoso-finance', text: 'Contoso Finance AU' },
  { key: 'contoso-emea', text: 'Contoso EMEA' },
  { key: 'contoso-it', text: 'Contoso IT Services' },
  { key: 'contoso-healthcare', text: 'Contoso Healthcare' },
  { key: 'contoso-apac', text: 'Contoso APAC' },
];

const getClassNames = memoizeFunction((theme: ITheme) =>
  mergeStyleSets({
    root: {
      width: '100%',
      height: 'calc(100vh - 88px)',
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
    stepDot: {
      width: 10,
      height: 10,
      borderRadius: '50%',
    },
    stepActive: {
      backgroundColor: '#107C10',
    },
    stepInactive: {
      backgroundColor: theme.palette.neutralTertiaryAlt,
    },
    stepText: {
      fontSize: 12,
      color: theme.palette.neutralSecondary,
    },
    stepTextActive: {
      fontSize: 12,
      color: '#107C10',
      fontWeight: 600,
    },
    stepChevron: {
      fontSize: 10,
      color: theme.palette.neutralTertiaryAlt,
    },
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
    previewLabel: {
      fontSize: 9,
      color: theme.palette.neutralSecondary,
    },
    content: {
      flex: 1,
      overflow: 'auto' as const,
      padding: '28px 32px',
    },
    card: {
      backgroundColor: theme.palette.white,
      border: `1px solid ${theme.palette.neutralLight}`,
      borderRadius: 4,
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 20px',
      borderBottom: `1px solid ${theme.palette.neutralLight}`,
      cursor: 'pointer',
    },
    cardHeaderText: {
      fontWeight: 600,
      fontSize: 14,
    },
    cardBody: {
      padding: '20px 28px 28px',
    },
    bookmarkHeader: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.palette.neutralPrimary,
    },
    fieldLabelBox: {
      backgroundColor: theme.palette.neutralLighter,
      padding: '8px 14px',
      borderRadius: 2,
      fontSize: 13,
      color: theme.palette.neutralSecondary,
      display: 'inline-block',
    },
    helperText: {
      fontSize: 12,
      color: theme.palette.neutralSecondary,
      lineHeight: '18px',
    },
    mappingRow: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 16,
    },
    mappingArrow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 6,
      color: theme.palette.neutralTertiary,
    },
    mappingLabel: {
      fontSize: 12,
      fontWeight: 600,
      color: theme.palette.neutralPrimary,
      marginBottom: 4,
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
    panelTopPivot: {
      paddingTop: 8,
    },
    panelFormSection: {
      paddingTop: 32,
    },
    panelSubPivot: {
      marginTop: 32,
    },
    panelFieldsContent: {
      paddingTop: 32,
    },
  })
);

export const DigitizeAmendmentPage: React.FC = () => {
  const theme = useTheme();
  const classNames = getClassNames(theme);
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [japaneseSelections, setJapaneseSelections] = React.useState<Record<string, string>>({
    '1': '', '2': '', '3': '', '4': '', '5': '',
  });
  const [englishMappings, setEnglishMappings] = React.useState<Record<string, string>>({
    '1': '', '2': '', '3': '', '4': '', '5': '',
  });
  const [isMandatory, setIsMandatory] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [modalLocale, setModalLocale] = React.useState('en-us');
  const [modalEnrollment, setModalEnrollment] = React.useState<string | undefined>(undefined);
  const [modalTenant, setModalTenant] = React.useState<string | undefined>(undefined);
  const [modalTab, setModalTab] = React.useState('fieldsAndTables');
  const [modalSubTab, setModalSubTab] = React.useState('fields');

  const handleJapaneseChange = (rowKey: string, optionKey: string) => {
    setJapaneseSelections((prev) => ({ ...prev, [rowKey]: optionKey }));
  };

  const handleEnglishChange = (rowKey: string, optionKey: string) => {
    setEnglishMappings((prev) => ({ ...prev, [rowKey]: optionKey }));
  };

  const getAvailableJapaneseOptions = (currentRowKey: string): IDropdownOption[] => {
    const selectedByOthers = new Set(
      Object.entries(japaneseSelections)
        .filter(([k, v]) => k !== currentRowKey && v)
        .map(([, v]) => v)
    );
    return JAPANESE_OPTIONS.map((opt) => ({
      ...opt,
      disabled: selectedByOthers.has(opt.key as string),
    }));
  };

  const getAvailableEnglishOptions = (currentRowKey: string): IDropdownOption[] => {
    const selectedByOthers = new Set(
      Object.entries(englishMappings)
        .filter(([k, v]) => k !== currentRowKey && v)
        .map(([, v]) => v)
    );
    return ENGLISH_OPTIONS.map((opt) => ({
      ...opt,
      disabled: selectedByOthers.has(opt.key as string),
    }));
  };

  const japaneseOnlyOptions: IDropdownOption[] = JAPANESE_OPTIONS.map((opt) => ({
    key: opt.key,
    text: opt.text,
  }));

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
        {/* Preview Rail */}
        <div className={classNames.previewRail}>
          <div className={classNames.previewIconWrap}>
            <Icon iconName="EntryView" styles={{ root: { fontSize: 18 } }} />
            <Text className={classNames.previewLabel}>Preview</Text>
          </div>
        </div>

        {/* Content */}
        <div className={classNames.content}>
          <div className={classNames.card}>
            {/* Card Header */}
            <div className={classNames.cardHeader} onClick={() => setIsExpanded(!isExpanded)}>
              <Text className={classNames.cardHeaderText}>Field Configuration</Text>
              <Icon
                iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                styles={{ root: { fontSize: 12, color: theme.palette.neutralSecondary } }}
              />
            </div>

            {/* Card Body */}
            {isExpanded && (
              <div className={classNames.cardBody}>
                <Text styles={{ root: { fontSize: 12, color: theme.palette.neutralSecondary, display: 'block', marginBottom: 20 } }}>
                  Fields without a section grouping (Bookmarks starting with N5)
                </Text>

                <Separator />

                <Stack tokens={{ childrenGap: 12 }} styles={{ root: { marginTop: 20 } }}>
                  <Text className={classNames.bookmarkHeader}>Bookmark - N5_01 (DropDown)</Text>

                  <Stack tokens={{ childrenGap: 6 }}>
                    <Text styles={{ root: { fontSize: 12, fontWeight: 600 } }}>Field Label</Text>
                    <div className={classNames.fieldLabelBox}>Choose Enrollment</div>
                  </Stack>

                  <Text className={classNames.helperText}>
                    Map the options in the dropdown to their english counterparts. This will help with the automation of the digitised amendment.
                  </Text>
                </Stack>

                {/* Mapping rows */}
                <Stack tokens={{ childrenGap: 20 }} styles={{ root: { marginTop: 24 } }}>
                  {ROW_KEYS.map((rowKey, idx) => (
                    <div key={rowKey} className={classNames.mappingRow}>
                      {/* Left dropdown - Japanese */}
                      <Stack styles={{ root: { width: 260 } }}>
                        <Text className={classNames.mappingLabel}>Dropdown Option {idx + 1}</Text>
                        <Dropdown
                          placeholder="Select option"
                          selectedKey={japaneseSelections[rowKey]}
                          options={getAvailableJapaneseOptions(rowKey)}
                          onChange={(_, option) => {
                            if (option) handleJapaneseChange(rowKey, option.key as string);
                          }}
                          styles={{ dropdown: { width: 260 } }}
                        />
                      </Stack>

                      {/* Arrow */}
                      <div className={classNames.mappingArrow}>
                        <Icon iconName="Forward" styles={{ root: { fontSize: 16 } }} />
                      </div>

                      {/* Right dropdown - English mapping */}
                      <Stack styles={{ root: { width: 260 } }}>
                        <Text className={classNames.mappingLabel}>Map to this option</Text>
                        <Dropdown
                          placeholder="Select option"
                          selectedKey={englishMappings[rowKey]}
                          options={getAvailableEnglishOptions(rowKey)}
                          onChange={(_, option) => {
                            if (option) handleEnglishChange(rowKey, option.key as string);
                          }}
                          styles={{ dropdown: { width: 260 } }}
                        />
                      </Stack>
                    </div>
                  ))}
                </Stack>

                <Separator styles={{ root: { marginTop: 28, marginBottom: 20 } }} />

                {/* Description */}
                <Stack tokens={{ childrenGap: 8 }}>
                  <Text styles={{ root: { fontSize: 12, fontWeight: 600 } }}>Description</Text>
                  <TextField
                    placeholder="Enter description of this bookmark here"
                    styles={{ root: { maxWidth: 500 } }}
                  />
                </Stack>

                {/* Mandatory field */}
                <Stack styles={{ root: { marginTop: 20 } }}>
                  <Checkbox
                    label="Mandatory field"
                    checked={isMandatory}
                    onChange={(_, checked) => setIsMandatory(!!checked)}
                  />
                </Stack>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        className={classNames.fab}
        onClick={() => {
          setModalLocale('en-us');
          setModalEnrollment(undefined);
          setModalTenant(undefined);
          setModalTab('fieldsAndTables');
          setModalSubTab('fields');
          setIsModalOpen(true);
        }}
      >
        <Icon iconName="EditNote" styles={{ root: { fontSize: 16, color: '#ffffff' } }} />
        Go to Edit Amendment
      </button>

      {/* Edit Amendment Panel */}
      <Panel
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
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
          {/* Preview Rail */}
          <div className={classNames.panelPreviewRail}>
            <Stack horizontalAlign="center" tokens={{ childrenGap: 4 }}>
              <Icon iconName="EntryView" styles={{ root: { fontSize: 20, color: theme.palette.neutralPrimary } }} />
              <Text styles={{ root: { fontSize: 11, color: theme.palette.neutralSecondary } }}>Preview</Text>
            </Stack>
          </div>

          {/* Content */}
          <div className={classNames.panelContent}>
            <div className={classNames.panelTopPivot}>
              <Pivot
                selectedKey={modalTab}
                onLinkClick={(item) => {
                  if (item?.props.itemKey) setModalTab(item.props.itemKey);
                }}
              >
                <PivotItem headerText="Edit Fields and tables" itemKey="fieldsAndTables" />
                <PivotItem headerText="Edit Content" itemKey="editContent" />
              </Pivot>
            </div>

            {modalTab === 'fieldsAndTables' && (
              <div className={classNames.panelFormSection}>
                <Stack tokens={{ childrenGap: 6 }}>
                  <Label required>Number & Date Format</Label>
                  <Dropdown
                    selectedKey={modalLocale}
                    options={LOCALE_OPTIONS}
                    onChange={(_, option) => {
                      if (option) setModalLocale(option.key as string);
                    }}
                    styles={{ dropdown: { maxWidth: 300 } }}
                  />
                </Stack>

                <div className={classNames.panelSubPivot}>
                  <Pivot
                    selectedKey={modalSubTab}
                    onLinkClick={(item) => {
                      if (item?.props.itemKey) setModalSubTab(item.props.itemKey);
                    }}
                  >
                    <PivotItem headerText="Fields" itemKey="fields" />
                    <PivotItem headerText="Tables" itemKey="tables" />
                  </Pivot>
                </div>

                {modalSubTab === 'fields' && (
                  <div className={classNames.panelFieldsContent}>
                    <Stack horizontal tokens={{ childrenGap: 40 }}>
                      <Stack tokens={{ childrenGap: 6 }}>
                        <Label required>Choose Enrollment</Label>
                        <Dropdown
                          placeholder="<加入契約を選択してください>"
                          selectedKey={modalEnrollment}
                          options={japaneseOnlyOptions}
                          onChange={(_, option) => {
                            if (option) setModalEnrollment(option.key as string);
                          }}
                          styles={{ dropdown: { width: 300 } }}
                        />
                      </Stack>

                      <Stack tokens={{ childrenGap: 6 }}>
                        <Label>List Tenants</Label>
                        <Dropdown
                          placeholder="Select"
                          selectedKey={modalTenant}
                          options={TENANT_OPTIONS}
                          onChange={(_, option) => {
                            if (option) setModalTenant(option.key as string);
                          }}
                          styles={{ dropdown: { width: 200 } }}
                        />
                      </Stack>
                    </Stack>
                  </div>
                )}

                {modalSubTab === 'tables' && (
                  <div className={classNames.panelFieldsContent}>
                    <Text styles={{ root: { color: theme.palette.neutralSecondary } }}>
                      Table editing options will appear here.
                    </Text>
                  </div>
                )}
              </div>
            )}

            {modalTab === 'editContent' && (
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
