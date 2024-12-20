class AiController < ApplicationController
  def suggest
    # Initialize the OpenAI client (already configured via the initializer)
    client = OpenAI::Client.new

    # Input text from the user
    input_text = params[:text]

    begin
      response = client.chat(
        parameters: {
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Expand this text: #{input_text}" }
          ],
          temperature: 0.9,
          max_tokens: 100
        }
      )
      suggestion = response.dig("choices", 0, "message", "content")
      render json: { suggestion: suggestion }
    rescue OpenAI::Error => e
      if e.http_status == 429
        Rails.logger.warn "Rate limit exceeded. Retrying after delay..."
        sleep(5) # Wait for 5 seconds before retrying
        retry
      else
        Rails.logger.error "OpenAI API Error: #{e.message}"
        render json: { error: "OpenAI API request failed." }, status: 500
      end
    end
  end
end
