import React from "react";

import Tabs from "./TabComponent";
import Avatar from "./Avatar";
import General from "./General";
import Address from "./Address";
import Security from "./Security";
import Preference from "./Preference";

const ProfileSettings = () => {
  return (
    <div className="w-full sm:flex min-h-screen">
      {/* Tab Sections */}
      <Avatar />
      <Tabs>
        <div label="General">
          {/* Profile Avatar */}
          <General />
        </div>
        <div label="Address">
          <Address />
        </div>
        <div label="Security">
          <Security />
        </div>
        <div label="Preferences">
          <Preference />
        </div>
      </Tabs>
    </div>
  );
};

export default ProfileSettings;
