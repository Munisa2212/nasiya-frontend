import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';

dayjs.extend(dayLocaleData);
dayjs.locale('zh-cn');

type Props = {
  value: Dayjs;
  onChange: (value: Dayjs) => void;
  data?: any; 
};

const CustomCalendar: React.FC<Props> = ({ value, onChange, data }) => {
  const { token } = theme.useToken();

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log('Panel Changed:', value.format('YYYY-MM-DD'), mode);
  };

  const wrapperStyle: React.CSSProperties = {
    width: 360,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    padding: 16,
    backgroundColor: token.colorBgContainer,
  };

  React.useEffect(() => {
    if (data) {
      console.log('Fetched Data:', data);
    }
  }, [data]);

  return (
    <div style={wrapperStyle}>
      <Calendar
        fullscreen={false}
        value={value}
        onSelect={onChange}
        onPanelChange={onPanelChange}
        headerRender={() => null}
      />
    </div>
  );
};

export default CustomCalendar;

