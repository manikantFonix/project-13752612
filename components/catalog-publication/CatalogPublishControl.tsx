'use client';

import { useEffect, useRef, useState } from 'react';
import { type PublicationData, type PublicationState } from './types';
import PublishDialog from './PublishDialog';
import PublishedPanel from './PublishedPanel';
import UnpublishDialog from './UnpublishDialog';
import DeleteCatalogDialog from './DeleteCatalogDialog';

interface Props {
  catalogName: string;
  data: PublicationData;
  pubState: PublicationState;
  onChangePubState: (s: PublicationState) => void;
}

export default function CatalogPublishControl({
  catalogName,
  data,
  pubState,
  onChangePubState,
}: Props) {
  const [publishOpen, setPublishOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [unpublishOpen, setUnpublishOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const publishBtnRef = useRef<HTMLButtonElement>(null);
  const publishedBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pubState === 'publishing') {
      setPublishOpen(true);
      setPanelOpen(false);
      setUnpublishOpen(false);
      setDeleteOpen(false);
    } else if (pubState === 'deleting') {
      setDeleteOpen(true);
      setPanelOpen(false);
      setPublishOpen(false);
      setUnpublishOpen(false);
    } else {
      setPublishOpen(false);
      setDeleteOpen(false);
      setUnpublishOpen(false);
    }
  }, [pubState]);

  const published = pubState === 'published';

  return (
    <>
      <div className="relative">
        {published ? (
          <button
            ref={publishedBtnRef}
            onClick={() => setPanelOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={panelOpen}
            className="h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3D6B54]" />
            <span className="text-[#3D6B54]">Published</span>
          </button>
        ) : (
          <button
            ref={publishBtnRef}
            onClick={() => setPublishOpen(true)}
            className="h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            Publish catalog
          </button>
        )}

        <PublishedPanel
          open={panelOpen}
          onClose={() => setPanelOpen(false)}
          triggerRef={publishedBtnRef}
          data={data}
          onUnpublish={() => {
            setPanelOpen(false);
            setUnpublishOpen(true);
          }}
          onDelete={() => {
            setPanelOpen(false);
            setDeleteOpen(true);
          }}
        />
      </div>

      <PublishDialog
        open={publishOpen}
        catalogName={catalogName}
        data={data}
        busy={pubState === 'publishing'}
        onCancel={() => setPublishOpen(false)}
        onPublished={() => {
          setPublishOpen(false);
          onChangePubState('published');
        }}
        triggerRef={publishBtnRef}
      />

      <UnpublishDialog
        open={unpublishOpen}
        catalogName={catalogName}
        onCancel={() => setUnpublishOpen(false)}
        onUnpublished={() => {
          setUnpublishOpen(false);
          onChangePubState('not-published');
        }}
        triggerRef={publishedBtnRef}
      />

      <DeleteCatalogDialog
        open={deleteOpen}
        catalogName={catalogName}
        data={data}
        busy={pubState === 'deleting'}
        onCancel={() => setDeleteOpen(false)}
        triggerRef={publishedBtnRef}
      />
    </>
  );
}