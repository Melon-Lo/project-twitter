import './SettingPage.scss'
import { SideBar } from 'components/SideBar/SideBar';
import { Setting } from 'components/Setting/Setting';

export const SettingPage = () => {
  return (
    <div className="settingPageContainer">
      <SideBar />
      <Setting />
    </div>
  )
};