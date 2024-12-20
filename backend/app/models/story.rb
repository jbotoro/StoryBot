class Story < ApplicationRecord
  before_update :save_version

  private

  def save_version
    self.versions ||= []
    if self.content_changed?
      self.versions << { content: self.content, timestamp: Time.now.utc }
    end
  end
end
