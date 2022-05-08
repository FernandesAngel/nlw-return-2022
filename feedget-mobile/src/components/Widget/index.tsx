import { ChatTeardropDots } from 'phosphor-react-native';
import React, {useRef, useState} from 'react';
import {  TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet'
import { theme } from '../../theme';

import { Options } from '../Options';

import { styles } from './styles';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { feedbackTypes } from '../../utils/feedbackTypes';
import {Form} from '../Form';
import { Success } from '../Success';

export type FeedbackType = keyof typeof feedbackTypes


function WidgetCustom(): JSX.Element {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleOpen() {
    bottomSheetRef.current?.expand()
  }

  function handleRestartFeedback(){
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  function handleFeedbackSent(){
    setFeedbackSent(true)
  }

  return(
      <>
        <TouchableOpacity style={styles.button} onPress={handleOpen}>
          <ChatTeardropDots color={theme.colors.text_primary} />
        </TouchableOpacity>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[1, 300]}
          backgroundStyle={styles.modal}
          handleIndicatorStyle={styles.indicator}

        >

          {
            feedbackSent ? <Success onSendAnotherFeedback={handleRestartFeedback} /> :
            <>
              { feedbackType ?
              <Form
                feedbackType={feedbackType}
                onFeedbackCanceled={handleRestartFeedback}
                onFeedbackSent={handleFeedbackSent}
              /> :
              <Options onFeedbackTypeChanged={setFeedbackType} />
              }
            </>
          }
        </BottomSheet>
      </>
  );
}

const Widget = gestureHandlerRootHOC(WidgetCustom)
export default Widget