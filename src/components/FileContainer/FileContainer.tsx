import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import "./FileContainer.scss";
import { default as IStores, IFileStore } from "@stores/interface";
import Status from "@components/Status/Status";
import Content from "@components/FileContainer/comp/Content";

type TProps = {
  fileStore?: IFileStore;
};

const FileContainer = inject((stores: IStores) => ({
  fileStore: stores.fileStore,
}))(
  observer((props: TProps) => {
    const { fileStore } = props;

    useEffect(() => {
      fileStore.init();
    }, []);

    return (
      <div className='file-container'>
        <Status />
        <Content />
      </div>
    );
  })
);

export default FileContainer;
