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
import {useResetState} from './hooks';

export function CameraButton() {
  const [, setStream] = useAtom(atomDefs.ShareStream);
  const [, setStreamSource] = useAtom(atomDefs.StreamSourceAtom);
  const [, setImageSrc] = useAtom(atomDefs.ImageSrcAtom);
  const resetState = useResetState();

  return (
    <button
      className="button flex gap-3 justify-center items-center"
      onClick={() => {
        resetState();
        setImageSrc(null);
        navigator.mediaDevices
          .getUserMedia({video: true})
          .then((stream) => {
            setStream(stream);
            setStreamSource('camera');
          })
          .catch((err) => {
            console.error('Error accessing camera:', err);
          });
      }}>
      <div className="text-lg">📷</div>
      <div>Camera</div>
    </button>
  );
}
