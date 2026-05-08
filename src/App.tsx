import * as React from 'react';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { Stack } from '@fluentui/react/lib/Stack';
import { useTheme } from '@fluentui/react';
import { EditAmendmentPage } from './EditAmendmentPage';
import { DigitizeAmendmentPage } from './DigitizeAmendmentPage';
import { Requirement2Page } from './Requirement2Page';
import { Requirement3Page } from './Requirement3Page';

export const App: React.FC = () => {
  const theme = useTheme();
  const [activeReq, setActiveReq] = React.useState('req1');

  return (
    <Stack styles={{ root: { height: '100vh', overflow: 'hidden' } }}>
      {/* Top-level requirement tabs */}
      <Pivot
        selectedKey={activeReq}
        onLinkClick={(item) => {
          if (item?.props.itemKey) setActiveReq(item.props.itemKey);
        }}
        linkFormat="tabs"
        styles={{
          root: {
            padding: '0 16px',
            borderBottom: `1px solid ${theme.palette.neutralLight}`,
            flexShrink: 0,
            backgroundColor: theme.palette.neutralLighterAlt,
          },
        }}
      >
        <PivotItem headerText="Requirement 1" itemKey="req1" />
        <PivotItem headerText="Requirement 2" itemKey="req2" />
        <PivotItem headerText="Requirement 3" itemKey="req3" />
      </Pivot>

      {activeReq === 'req1' && (
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

      {activeReq === 'req2' && <Requirement2Page />}

      {activeReq === 'req3' && <Requirement3Page />}
    </Stack>
  );
};
