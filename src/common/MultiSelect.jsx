import React from "react";

//? import components
import Loading from "@/common/Loading";

//? import mui
import Divider from "@mui/material/Divider";

export default function MultiSelect({
  status,
  options,
  filter,
  filterHandler,
}) {
  return (
    <div className={status ? "block" : "hidden"}>
      <div className="absolute z-50 min-w-full top-20 max-h-[400px] rounded-md border border-gray-default/20 bg-white/50 backdrop-blur-md p-2 overflow-y-auto overflow-x-hidden">
        {!options[status.name] ? (
          <Loading />
        ) : (
          <>
            <span className="text-gray-700 text-xl">{status.name}</span>
            <Divider sx={{ margin: "10px 0px" }} />
            {status.parent
              ? options[status.name].map((option, index) => {
                  return (
                    <div key={option.label} className="my-2">
                      <span className="text-gray-400">{option?.label}</span>
                      {option?.options?.map((child) => (
                        <div
                          key={child.label}
                          className="flex items-center justify-end flex-row-reverse gap-x-1 mx-2"
                        >
                          <label
                            className="cursor-pointer text-lg"
                            htmlFor={child?.value}
                          >
                            {child?.label}
                          </label>
                          <input
                            id={child?.value}
                            className="checkBox"
                            type="checkbox"
                            onChange={(event) =>
                              filterHandler(child, status.name)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  );
                })
              : options[status.name].map((option) => {
                  return (
                    <div key={option.label} className="my-2">
                      <div className="flex items-center justify-end flex-row-reverse gap-x-1 mx-2">
                        <label
                          className="cursor-pointer text-lg"
                          htmlFor={option?.value}
                        >
                          {option?.label}
                        </label>
                        {status.name === "country" ? (
                          <input
                            id={option?.value}
                            className="checkBox"
                            type="checkbox"
                            checked={
                              filter[status.name] == option?.value && true
                            }
                            onChange={(event) =>
                              filterHandler(option, status.name)
                            }
                          />
                        ) : (
                          <input
                            id={option?.value}
                            className="checkBox"
                            type="checkbox"
                            onChange={(event) =>
                              filterHandler(option, status.name)
                            }
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
          </>
        )}
      </div>
    </div>
  );
}
