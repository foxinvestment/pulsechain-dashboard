import { useAtom } from 'jotai'
import styled from 'styled-components'
import 'typeface-raleway'
import { appSettingsAtom, deleteDataModalAtom, keyAtom } from '../store'
import { icons_list } from '../config/icons'
import Icon from '../components/Icon'
import Button from '../components/Button'
import { useAppContext } from './AppContext'
import { defaultSettings } from '../config/settings'
import { Checkbox } from '../components/Checkbox'
import { useState, useEffect } from 'react'
import { Input } from '../components/Input'
import { useValidateRpc } from '../hooks/useValidateRpc'
import { hashString } from '../lib/crypto'

const ModalWrapper = styled.div`
  position: absolute; top: 0; left: 0; height: 100vh; width: 100vw;
  user-select: none;
  z-index: 100;
  background: rgba(30,30,30, 0.9);
  backdrop-filter: blur(3px);
  overflow: hidden;

  .close-button {
    color: white;
    background: rgba(0,0,0,0);
    outline: none;
    border: none;
    position: absolute; right: 10px;
    cursor: pointer;

    padding: 10px 20px;
    color: rgb(240,240,240);
    transition: color 0.3s ease;
    cursor: pointer;
    &:hover {
      color: rgb(200,200,200);
    }
  }
`

const ModelOverLay = styled.div`
  position: fixed; top: 0; left: 0; height: 100vh; width: 100vw;
  z-index: 500;
  overflow: hidden;
`

const ModalContent = styled.div`
  position: absolute;
  top: 50%; left: 50%;
  transform: translateX(-50%) translateY(-50%);
  max-height: 80%; width: 500px;
  background: rgb(50,50,50);
  border-radius: 15px;
  z-index: 1000;
  padding-bottom: 20px;

  overflow-x: hidden;
  color: white;

  .modal-header {
    padding: 20px 30px;
    border-bottom: 1px solid rgb(70, 70, 70);
    font-size: 20px;
    font-weight: 800;

    display: flex;
    align-items: center; /* Aligns items vertically */
    gap: 8px; /* Adds space between the icon and text */
    font-size: 20px; /* Adjust as needed for your text size */
  }
`

const RepoItem = styled.div`
  display: grid;
  grid-template-columns: 320px 150px;
  align-items: center; /* Aligns items vertically */
  gap: 8px; /* Adds space between the icon and text */
  font-size: 20px; /* Adjust as needed for your text size */
  white-space: normal; /* Allows text to wrap */
  word-wrap: break-word; /* Break long words if necessary */
  overflow-wrap: break-word; /* Ensures wrapping works for all cases */
  max-width: 100%; /* Optional: Restrict width */
`

function DeleteDataModal() {
  const [ modal, setModal ] = useAtom(deleteDataModalAtom)
  const [ key, setKey ] = useAtom(keyAtom)

  const eraseData = async () => {
    try {
        await window.electron.deleteFile('config.json')
        console.log('Data erased')
        window.location.reload()
    } catch (error) {
        console.error('Error erasing data:', error)
    }
  }

  return (
    <ModalWrapper>
      <ModalContent>
        <div style={{ overflowY: 'auto' }}>
          <div className="modal-header">
              <Icon icon={icons_list.settings} size={24}/> {modal?.header ?? 'Settings'}
              <button className="close-button" onClick={() => setModal(null)}>
                X
              </button>
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '20px 40px' }}>
          Delete all data and reset to default settings?
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0px 40px' }}>
          <div>
            <div>
              <Button onClick={() => {
                eraseData()
              }} textAlign="center"
              style={{ background: 'rgb(140,60,60)', color: 'white' }}>Erase All Data</Button>
            </div>
          </div>
        </div>
      </ModalContent>
      <ModelOverLay onClick={() => setModal(false)}/>
    </ModalWrapper>
  )
}

export default DeleteDataModal