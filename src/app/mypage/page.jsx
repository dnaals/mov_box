'use client';
import React, { useState } from 'react';
import Mypage from '../../comp/UIUX/Mypage';
import Setting from '../../comp/UIUX/Setting';
function Page(props) {
    const [settingClick, setSettingClick] = useState(false);

    return (
        <div>
            {
                settingClick ?
                    <Setting setSettingClick={setSettingClick} />
                    :
                    <Mypage setSettingClick={setSettingClick} />
            }
        </div>
    );
}

export default Page;