import React from "react";
import { inject, observer } from "mobx-react";
import { default as IStores, IFileStore } from "@stores/interface";
import styled from "styled-components";

type TProps = {
  fileStore?: IFileStore;
};

const FileContainer = inject((stores: IStores) => ({
  fileStore: stores.fileStore,
}))(
  observer((props: TProps) => {
    const { fileStore } = props;

    const FileRect = styled.div`
      width: ${(props: any) => props.width + "px"};
      height: ${(props: any) => props.height + "px"};
      font-size: ${(props: any) => props.fontSize + "px"};
    `;

    return (
      <div className='file-content'>
        {fileStore.loading &&
          fileStore.files.map((file: any) => {
            console.log("file", file);
            return (
              <FileRect
                className='file-rect'
                width={file.shape.width ? file.shape.width : 0}
                height={file.shape.height ? file.shape.height : 0}
                fontSize={(file.part / 100) * 72}
              >
                <div className='filename'>{file.name}</div>
                <div className='format'>{file.format}</div>
              </FileRect>
            );
          })}
      </div>
    );
  })
);

export default FileContainer;
