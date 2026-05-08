import * as React from 'react';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { IconButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Label } from '@fluentui/react/lib/Label';
import { Icon } from '@fluentui/react/lib/Icon';
import { useTheme, ITheme } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/merge-styles';
import { memoizeFunction } from '@fluentui/utilities';

const ENROLLMENT_OPTIONS: IDropdownOption[] = [
  { key: 'enterprise', text: 'エンタープライズ加入契約', data: { subtitle: 'Enterprise Enrollment' } },
  { key: 'server-cloud', text: 'サーバーおよびクラウド加入契約', data: { subtitle: 'Server and Cloud Enrollment' } },
  { key: 'enterprise-sub', text: 'エンタープライズサブスクリプション契約', data: { subtitle: 'Enterprise Subscription Enrollment' } },
  { key: 'education', text: '教育ソリューション加入契約', data: { subtitle: 'Enrollment for Education Solutions' } },
  { key: 'school-sub', text: '学校サブスクリプション加入契約', data: { subtitle: 'School Subscription Enrollment' } },
];

const LOCALE_OPTIONS: IDropdownOption[] = [
  { key: 'en-us', text: 'English (United States)' },
  { key: 'en-gb', text: 'English (United Kingdom)' },
  { key: 'de-de', text: 'German (Germany)' },
  { key: 'fr-fr', text: 'French (France)' },
  { key: 'ja-jp', text: 'Japanese (Japan)' },
  { key: 'zh-cn', text: 'Chinese (China)' },
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
      ':hover': {
        color: theme.palette.themePrimary,
      },
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
    topPivot: {
      paddingTop: 8,
    },
    formSection: {
      paddingTop: 32,
    },
    subPivot: {
      marginTop: 32,
    },
    fieldsContent: {
      paddingTop: 32,
    },
  })
);

export const EditAmendmentPage: React.FC = () => {
  const theme = useTheme();
  const classNames = getClassNames(theme);
  const [selectedLocale, setSelectedLocale] = React.useState<string>('en-us');
  const [selectedEnrollment, setSelectedEnrollment] = React.useState<string | undefined>(undefined);
  const [selectedTenant, setSelectedTenant] = React.useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = React.useState<string>('fieldsAndTables');
  const [activeSubTab, setActiveSubTab] = React.useState<string>('fields');

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
            <Icon
              iconName="EntryView"
              styles={{ root: { fontSize: 20 } }}
            />
            <Text className={classNames.previewLabel}>Preview</Text>
          </div>
        </div>

        {/* Content Area */}
        <div className={classNames.content}>
          {/* Top-level tabs */}
          <div className={classNames.topPivot}>
            <Pivot
              selectedKey={activeTab}
              onLinkClick={(item) => {
                if (item?.props.itemKey) {
                  setActiveTab(item.props.itemKey);
                }
              }}
            >
              <PivotItem headerText="Edit Fields and tables" itemKey="fieldsAndTables" />
              <PivotItem headerText="Edit Content" itemKey="editContent" />
            </Pivot>
          </div>

          {activeTab === 'fieldsAndTables' && (
            <div className={classNames.formSection}>
              {/* Number & Date Format */}
              <Stack tokens={{ childrenGap: 6 }}>
                <Label required>Number & Date Format</Label>
                <Dropdown
                  selectedKey={selectedLocale}
                  options={LOCALE_OPTIONS}
                  onChange={(_, option) => {
                    if (option) setSelectedLocale(option.key as string);
                  }}
                  styles={{ dropdown: { maxWidth: 300 } }}
                />
              </Stack>

              {/* Sub-tabs: Fields | Tables */}
              <div className={classNames.subPivot}>
                <Pivot
                  selectedKey={activeSubTab}
                  onLinkClick={(item) => {
                    if (item?.props.itemKey) {
                      setActiveSubTab(item.props.itemKey);
                    }
                  }}
                >
                  <PivotItem headerText="Fields" itemKey="fields" />
                  <PivotItem headerText="Tables" itemKey="tables" />
                </Pivot>
              </div>

              {activeSubTab === 'fields' && (
                <div className={classNames.fieldsContent}>
                  <Stack horizontal tokens={{ childrenGap: 40 }}>
                    {/* Choose Enrollment */}
                    <Stack tokens={{ childrenGap: 6 }}>
                      <Label required>Choose Enrollment</Label>
                      <Dropdown
                        placeholder="Option text"
                        selectedKey={selectedEnrollment}
                        options={ENROLLMENT_OPTIONS}
                        onChange={(_, option) => {
                          if (option) setSelectedEnrollment(option.key as string);
                        }}
                        onRenderOption={(option) => {
                          if (!option) return null;
                          return (
                            <Stack tokens={{ childrenGap: 1 }} styles={{ root: { padding: '8px 0' } }}>
                              <Text styles={{ root: { fontWeight: 600, fontSize: 14, lineHeight: '18px' } }}>{option.text}</Text>
                              <Text styles={{ root: { fontSize: 12, lineHeight: '16px', color: theme.palette.neutralSecondary } }}>
                                {option.data?.subtitle}
                              </Text>
                            </Stack>
                          );
                        }}
                        styles={{
                          dropdown: { width: 320 },
                          dropdownItemsWrapper: { maxHeight: 400 },
                          dropdownItem: { minHeight: 52, borderBottom: `1px solid ${theme.palette.neutralLighter}` },
                          dropdownItemSelected: { minHeight: 52, borderBottom: `1px solid ${theme.palette.neutralLighter}` },
                          dropdownItemSelectedAndDisabled: { minHeight: 52 },
                        }}
                      />
                    </Stack>

                    {/* List Tenants */}
                    <Stack tokens={{ childrenGap: 6 }}>
                      <Label>List Tenants</Label>
                      <Dropdown
                        placeholder="Select"
                        selectedKey={selectedTenant}
                        options={TENANT_OPTIONS}
                        onChange={(_, option) => {
                          if (option) setSelectedTenant(option.key as string);
                        }}
                        styles={{ dropdown: { width: 200 } }}
                      />
                    </Stack>
                  </Stack>
                </div>
              )}

              {activeSubTab === 'tables' && (
                <div className={classNames.fieldsContent}>
                  <Text styles={{ root: { color: theme.palette.neutralSecondary } }}>
                    Table editing options will appear here.
                  </Text>
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
