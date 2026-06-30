import * as React from 'react';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { Stack } from '@fluentui/react/lib/Stack';
import { useTheme, DefaultButton, Panel, PanelType, Text } from '@fluentui/react';
import { EditAmendmentPage } from './EditAmendmentPage';
import { DigitizeAmendmentPage } from './DigitizeAmendmentPage';
import { Requirement2Page } from './Requirement2Page';
import { Requirement3Page } from './Requirement3Page';

export const App: React.FC = () => {
  const theme = useTheme();
  const [archiveOpen, setArchiveOpen] = React.useState(false);
  const [archiveTab, setArchiveTab] = React.useState('req1');

  return (
    <Stack styles={{ root: { height: '100vh', overflow: 'hidden' } }}>
      {/* Top bar with Archive button and main tab */}
      <Stack
        horizontal
        verticalAlign="center"
        styles={{
          root: {
            borderBottom: `1px solid ${theme.palette.neutralLight}`,
            flexShrink: 0,
            backgroundColor: theme.palette.neutralLighterAlt,
            padding: '0 16px',
          },
        }}
      >
        <DefaultButton
          text="Archive"
          iconProps={{ iconName: 'Archive' }}
          onClick={() => setArchiveOpen(true)}
          styles={{
            root: {
              marginRight: 12,
              fontSize: 12,
              height: 32,
              padding: '0 10px',
              border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
            },
          }}
        />
        <Text
          variant="mediumPlus"
          styles={{ root: { fontWeight: 600, color: theme.palette.neutralPrimary } }}
        >
          Localization Automation_Date Field UX
        </Text>
      </Stack>

      {<Requirement2Page />}

      {/* Archive panel */}
      <Panel
        isOpen={archiveOpen}
        onDismiss={() => setArchiveOpen(false)}
        type={PanelType.custom}
        customWidth="80vw"
        headerText="Archive"
        isLightDismiss
        styles={{ main: { width: '80vw', maxWidth: '80vw' }, scrollableContent: { overflowX: 'auto' } }}
      >
        <Pivot
          selectedKey={archiveTab}
          onLinkClick={(item) => {
            if (item?.props.itemKey) setArchiveTab(item.props.itemKey);
          }}
          linkFormat="tabs"
          styles={{
            root: {
              borderBottom: `1px solid ${theme.palette.neutralLight}`,
              marginBottom: 0,
            },
          }}
        >
          <PivotItem headerText="Requirement 1" itemKey="req1" />
          <PivotItem headerText="Requirement 3" itemKey="req3" />
        </Pivot>

        {archiveTab === 'req1' && (
          <Stack styles={{ root: { flex: 1, overflow: 'hidden' } }}>
            <Pivot
              styles={{
                root: {
                  padding: '0 16px',
                  borderBottom: `1px solid ${theme.palette.neutralLight}`,
                  flexShrink: 0,
                },
              }}
            >
              <PivotItem headerText="Option 1" itemKey="option1">
                <EditAmendmentPage />
              </PivotItem>
              <PivotItem headerText="Option 2" itemKey="option2">
                <DigitizeAmendmentPage />
              </PivotItem>
            </Pivot>
          </Stack>
        )}

        {archiveTab === 'req3' && <Requirement3Page />}
      </Panel>
    </Stack>
  );
};
