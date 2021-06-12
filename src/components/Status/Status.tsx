import React from "react";
import { inject, observer } from "mobx-react";
import "./Status.scss";
import { default as IStores, IFileStore } from "@stores/interface";

type TProps = {
  fileStore?: IFileStore;
};

const Status = inject((stores: IStores) => ({
  fileStore: stores.fileStore,
}))(
  observer((props: TProps) => {
    const { fileStore } = props;

    return (
      <div className='status'>
        <div className='status-title'>Status: {fileStore.status}</div>

        {fileStore.resolution && (
          <div className='status-title'>
            Resolution:
            <br /> x: {fileStore.resolution.x} y: {fileStore.resolution.y}
          </div>
        )}

        {fileStore.files.length > 0 &&
          fileStore.files.map((file: any) => {
            return (
              <div key={Math.random()} className='file-item'>
                {file.name} {file.size}
              </div>
            );
          })}
      </div>
    );
  })
);

export default Status;
