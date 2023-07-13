import React, {useEffect, useState} from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';
import { sendFeedback } from '../../utils/api';
import './CustomDialog.css';


interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  image: Blob;
  prediction: number;
}

const CustomDialog: React.FC<CustomDialogProps> = (props) => {
  const { open, onClose, image, prediction } = props;
  const [page, setPage] = useState<number>(0);
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const submitDialog = async (digit) => {
    await sendFeedback(image, digit);
    setPage(2);
  }

  useEffect(() => {
    setPage(0);
  }, [image]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: '400px',
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <ModalClose
          variant="outlined"
          sx={{
            top: 'calc(-1/4 * var(--IconButton-size))',
            right: 'calc(-1/4 * var(--IconButton-size))',
            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
            borderRadius: '50%',
            bgcolor: 'background.body',
          }}
        />
        {page === 0 && (
          <>
            <div className='dialog-title'>
              <Typography level="h2">Leave some feedback</Typography>
              <Typography level="p">
                This will help our model re-train with the data provided by you and
                improve its accuracy.
              </Typography>
            </div>
            <Divider />
            <div className="dialog-content">
              <Typography level="p">Was the prediction correct?</Typography>
              <ButtonGroup>
                <Button onClick={async () => {
                  await submitDialog(prediction);
                  setPage(2);
                }}>Yes</Button>
                <Button onClick={() => setPage(1)}>No</Button>
              </ButtonGroup>
            </div>
          </>
        )}
        {page === 1 && (
          <>
            <div className='dialog-title'>
              <Typography level="h2">What number did you write?</Typography>
              <Typography level="p">Please pick from the following list the number that you wrote.</Typography>
            </div>
            <Divider />
            <div className="dialog-content">
              <ButtonGroup>
                {digits.map((element) => (
                  <Button
                    key={element}
                    onClick={() => submitDialog(element)}
                  >
                    {element}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </>
        )}
        {page === 2 && (
          <>
            <div className='dialog-title'>
              <Typography level="h2">Thank you!</Typography>
            </div>
            <Divider />
            <div className="dialog-content">
              <Typography level="p">The model will be trained in the future with the data provided by you.</Typography>
            </div>
          </>
        )}
      </Sheet>
    </Modal>
  )
}

export default CustomDialog;
