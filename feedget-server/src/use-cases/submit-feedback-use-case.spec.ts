import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendaMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy },
    {sendMail: sendaMailSpy },
)


describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'bug',
            comment: 'dhfjksdhf',
            screenshot: 'data:image/png;base64djsfjsdfbjdtest.jpg'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendaMailSpy).toHaveBeenCalled()
    });

    it('should not be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'dhfjksdhf',
            screenshot: 'data:image/png;base64djsfjsdfbjdtest.jpg'
        })).rejects.toThrow()
    });

    it('should not be able to submit a feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'dsfsdf',
            comment: '',
            screenshot: 'data:image/png;base64djsfjsdfbjdtest.jpg'
        })).rejects.toThrow()
    });

    it('should not be able to submit a feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'dsfsdf',
            comment: 'uhuuu',
            screenshot: 'data:dsfsimage/png;base64djsfjsdfbjdtest.jpg'
        })).rejects.toThrow()
    });
})