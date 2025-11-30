import { ZonesExcelUploaderView } from "@/modules/zones/components/containers/zones-excel-container/ZonesExcelUploaderView";
import { useZonesExcelUpload } from "@/modules/zones/hooks/useZonesExcelUpload";

const ZonesExcelUploader = () => {
  const {
    parsedData,
    preview,
    uploadProgress,
    isUploading,
    handleFileUpload,
    handleSendToServer,
    handleDrop,
    handleDragOver,
  } = useZonesExcelUpload();

  return (
    <ZonesExcelUploaderView
      handleFileUpload={handleFileUpload}
      handleSendToServer={handleSendToServer}
      handleDrop={handleDrop}
      handleDragOver={handleDragOver}
      preview={preview}
      parsedData={parsedData}
      uploadProgress={uploadProgress}
      isUploading={isUploading}
    />
  );
};

export { ZonesExcelUploader };
export default ZonesExcelUploader;
