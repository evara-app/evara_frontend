import React from "react";

//? import components
import Card from "@/components/properties/Card";
import PropertiesSort from "@/app/(subPages)/properties/PropertiesSort";
import Pagination from "@/common/Pagination";

//? import mui
import Divider from "@mui/material/Divider";

function PropertyList({ propertiesList, searchParams }) {
  const { count, results } = propertiesList;
  const { viewType = "List" } = searchParams;

  console.log(viewType);

  const renderViews = () => {
    switch (viewType) {
      case "List":
        return (
          <div className="flex items-center justify-start gap-x-4 gap-y-2 flex-wrap">
            {results.map((item) => (
              <div className="flex-1">
                <Card cardData={item} />
              </div>
            ))}
          </div>
        );
      // case 2:
      //   return (
      //     <CheckOtp
      //       time={time}
      //       setOtp={setOtp}
      //       value={otp}
      //       sendOtpHandler={sendOtpHandler}
      //       checkOtpHandler={checkOtpHandler}
      //     />
      //   );
      default:
        break;
    }
  };
  return (
    <div>
      <PropertiesSort count={count} />
      <Divider sx={{ margin: "10px 0px" }} />
      {renderViews()}
      <div className="flex justify-center mt-10">
        <Pagination count={10} />
      </div>
    </div>
  );
}

export default PropertyList;
