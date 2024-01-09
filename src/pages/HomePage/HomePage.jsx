import { TodayWaterList } from 'components/TodayWaterList/TodayWaterList';
import Container from 'components/common/Container';
import { Wrapper } from './HomePage.styled';
import { WaterRatioPanel } from 'components/WaterRatioPanel/WaterRatioPanel';
import { WaterPanel } from 'components/WaterPanel/WaterPanel';
import { Calendar } from 'components/Calendar/Calendar';
import MyDailyNormaHome from 'components/MyDailyNormaHome/MyDailyNormaHome';

export default function HomePage() {
  return (
    <Wrapper>
      <Container>
        <MyDailyNormaHome />
        <WaterRatioPanel />
        <WaterPanel>
          <TodayWaterList />
          <Calendar />
        </WaterPanel>
      </Container>
    </Wrapper>
  );
}
