import { ArrowLeft} from 'phosphor-react-native';
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { Copyright } from '../Copyright';
import {ScreenshotButton} from '../ScreenshotButton';
import { FeedbackType } from '../Widget';
import {api} from '../../libs/api'

import * as FileSystem from 'expo-file-system'

import { styles } from './styles';

interface FormProps {
    feedbackType: FeedbackType
    onFeedbackCanceled: () => void
    onFeedbackSent: () => void
}

export function Form({feedbackType, onFeedbackCanceled, onFeedbackSent}: FormProps) {
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('')

    const feedbackTypeInfo = feedbackTypes[feedbackType]

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        }).then(uri => setScreenshot(uri)).catch(e => console.log(e))
    }

    function handleScreenshotRemove(){
        setScreenshot(null)
    }

    async function handleSendFeedback() {
        if(isSendingFeedback){
            return
        }
        setIsSendingFeedback(true)

        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'})

        try {
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment
            })

            onFeedbackSent()
        } catch (error) {
            console.log(error)
            setIsSendingFeedback(false)
        }
    }


  return (
      <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onFeedbackCanceled}>
                <ArrowLeft
                    size={24}
                    weight='bold'
                    color={theme.colors.text_secondary}
                />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Image
                    source={feedbackTypeInfo.image}
                    style={styles.image}
                />
                <Text style={styles.titleText}>
                    {feedbackTypeInfo.title}
                </Text>
            </View>
        </View>
        <View>
            <TextInput
                multiline
                style={styles.input}
                placeholder="Conte com detalhes o que está acontecendo..."
                placeholderTextColor={theme.colors.text_secondary}
                autoCorrect={false}
                onChangeText={setComment}
            />
        </View>
        <View style={styles.footer}>
            <ScreenshotButton
                onRemoveShot={handleScreenshotRemove}
                onTakeShot={handleScreenshot}
                screenshot={screenshot}
            />
            <Button isLoading={isSendingFeedback} onPress={handleSendFeedback} />
        </View>
        <View>
            <Copyright />
        </View>
      </View>
  );
}
