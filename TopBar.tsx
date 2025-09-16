/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
// Copyright 2024 Google LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     https://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {useAtom} from 'jotai';
// FIX: Using a namespace import to prevent potential naming collisions with atoms.
import * as atomDefs from './atoms';
import {imageOptions} from './consts';
import {useResetState} from './hooks';

export function TopBar() {
  const resetState = useResetState();
  const [revealOnHover, setRevealOnHoverMode] = useAtom(
    atomDefs.RevealOnHoverModeAtom,
  );
  const [detectType] = useAtom(atomDefs.DetectTypeAtom);
  const [, setHoverEntered] = useAtom(atomDefs.HoverEnteredAtom);
  const [stream, setStream] = useAtom(atomDefs.ShareStream);
  const [, setStreamSource] = useAtom(atomDefs.StreamSourceAtom);
  const [, setImageSrc] = useAtom(atomDefs.ImageSrcAtom);
  const [, setIsUploadedImage] = useAtom(atomDefs.IsUploadedImageAtom);

  return (
    <div className="flex w-full items-center px-3 py-2 border-b justify-between">
      <div className="flex gap-3 items-center">
        <button
          onClick={() => {
            if (stream) {
              stream.getTracks().forEach((track) => track.stop());
              setStream(null);
              setStreamSource(null);
            }
            setImageSrc(imageOptions[0]);
            setIsUploadedImage(false);
            resetState();
          }}
          className="!p-0 !border-none underline bg-transparent"
          style={{
            minHeight: '0',
          }}>
          <div>Reset session</div>
        </button>
      </div>
      <div className="flex gap-3 items-center">
        {detectType === '2D bounding boxes' ||
        detectType === 'Segmentation masks' ? (
          <div>
            <label className="flex items-center gap-2 px-3 select-none whitespace-nowrap">
              <input
                type="checkbox"
                checked={revealOnHover}
                onChange={(e) => {
                  if (e.target.checked) {
                    setHoverEntered(false);
                  }
                  setRevealOnHoverMode(e.target.checked);
                }}
              />
              <div>reveal on hover</div>
            </label>
          </div>
        ) : null}
      </div>
    </div>
  );
}
