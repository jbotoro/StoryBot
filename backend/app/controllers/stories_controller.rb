# app/controllers/stories_controller.rb
class StoriesController < ApplicationController
  before_action :set_story, only: [ :revert, :update ]

  def create
    story = Story.new(content: params[:content], versions: [])
    if story.save
      story.versions << { content: story.content, timestamp: Time.current }
      story.save
      render json: story, status: :created
    else
      render json: { error: story.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    Rails.logger.info("Updating story with ID: #{params[:id]} and content: #{params[:content]}")
    if @story.update(content: params[:content])
      render json: @story, status: :ok
    else
      Rails.logger.error("Failed to update story: #{@story.errors.full_messages}")
      render json: { error: @story.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def versions
    Rails.logger.info("Fetching versions for story ID: #{params[:id]}")
    story = Story.find(params[:id])
    render json: story.versions
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Story not found" }, status: :not_found
  end

  def revert
    version_index = params[:version_index].to_i
    version = @story.versions[version_index]

    if version
      @story.update!(content: version["content"])
      render json: { message: "Reverted successfully", story: @story }
    else
      render json: { error: "Version not found" }, status: :not_found
    end
  end

  private

  def set_story
    Rails.logger.info("Looking for story with ID: #{params[:id]}")
    @story = Story.find_by(id: params[:id])

    if @story.nil?
      Rails.logger.error("Story not found with ID: #{params[:id]}")
      render json: { error: "Story not found" }, status: :not_found
    end
  end

  def story_params
    params.require(:story).permit(:content)
  end
end
