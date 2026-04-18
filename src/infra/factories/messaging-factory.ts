import { SendEmailUseCase } from '@/domain/main/application/messaging/send-email.js'

export function makeSendEmailUseCase() {
  return new SendEmailUseCase()
}
