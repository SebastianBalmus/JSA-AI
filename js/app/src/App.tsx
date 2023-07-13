import React, { useState, FormEvent } from "react";
import Button from "@mui/joy/Button";
import IconButton from '@mui/joy/IconButton';
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Canvas from "./components/Canvas/Canvas";
import Appbar from "./components/Appbar/Appbar";
import CustomTable from "./components/CustomTable/CustomTable";
import CustomDialog from './components/CustomDialog/CustomDialog';
import theme from "./components/theme";
import usePaintCanvas from "./hooks/usePaintCanvas";
import useCanvasActions from "./hooks/useCanvasActions";
import buildProbabilityTable from "./utils/buildProbabilityTable";
import checkIfCanvasIsEmpty from "./utils/checkIfCanvasIsEmpty.ts";
import { sendImage } from "./utils/api";
import { Statistics } from "./types/types";
import './App.css';

const App: React.FC = () => {
  const { canvas, context } = usePaintCanvas();
  const { clearCanvas, getImage } = useCanvasActions(canvas, context);
  const [results, setResults] = useState<Array<Statistics>>(buildProbabilityTable());
  const [predicting, setPredicting] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<number>();
  const [emptyCanvas, setEmptyCanvas] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [image, setImage] = useState<Blob>();

  const predictImage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmpty = checkIfCanvasIsEmpty(canvas.current, context.current);
    if (isEmpty) {
      setEmptyCanvas(true);
      setTimeout(() => {
        setEmptyCanvas(false);
      }, 1000);
      return;
    }

    setPredicting(true);
    const img = await getImage();
    setImage(img)
    const res = await sendImage(img);
    if (res.status === 200) {
      setResults(buildProbabilityTable(res.data.all_predictions))
      setPrediction(res.data.prediction);
    }
    setPredicting(false);
  }

  const clearData = () => {
    clearCanvas();
    setResults(buildProbabilityTable());
    setPrediction(undefined);
  }

  return (
    <CssVarsProvider theme={theme}>
      {image && prediction && (
        <CustomDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          image={image}
          prediction={prediction}
        />
      )}
      <Appbar />
      <main>
        <form className="wrapper" onSubmit={async (e: FormEvent<HTMLFormElement>) => await predictImage(e)}>
          <div className="column">
            {Number.isInteger(prediction) ? (
              <div className="prompt">
                <Typography level="h2">You wrote: {prediction}</Typography>
                <IconButton
                  onClick={() => setOpenDialog(true)}
                  variant="solid"
                >
                  <TipsAndUpdatesIcon />
                </IconButton>
              </div>
            ) : (
              <Typography level="h2">&nbsp;</Typography>
            )}
            <Canvas canvasRef={canvas} />
            <Button
              fullWidth
              loading={predicting}
              type="submit"
              className={emptyCanvas ? 'shaking' : ''}
            >
                Predict
            </Button>
            <Button
              fullWidth
              variant="soft"
              type="button"
              onClick={clearData}
            >
              Clear
            </Button>
          </div>
          <div className="column">
            <CustomTable results={results} />
          </div>
        </form>
      </main>
    </CssVarsProvider>
  )
}

export default App
