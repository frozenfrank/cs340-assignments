import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  PutCommandOutput,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { MetadataBearer } from "@aws-sdk/types";
import { Follow } from "../entity/Follow";

type FollowHandles = Pick<Follow, "followee_handle" | "follower_handle">;

export class FollowDAO {
  private readonly tableName = "tweeter-follows";
  private readonly followerHandleAttr = "follower_handle";
  private readonly followeeHandleAttr = "followee_handle";
  private readonly followerNameAttr = "follower_name";
  private readonly followeeNameAttr = "followee_name";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient({region: 'us-west-2'}));

  /**
   * Records a new
   * @param followee The person being followed
   * @param follower The person following another
   */
  async putFollow(follow: Follow): Promise<PutCommandOutput> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: {
        ...follow
      }
    });

    const response = await this.client.send(command);
    this.logResponseOnError(response);
    return response;
  }

  /** Get a particular follow relationship, or `null` if it doesn't exist. */
  async getSomeFollow(followHandles: FollowHandles, consistentRead = false): Promise<Follow|null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: this.generateFollowKey(followHandles),
      ConsistentRead: consistentRead,
    });

    const response = await this.client.send(command);
    this.logResponseOnError(response);
    if (response.Item) {
      return this.readFollow(response.Item);
    }
    return null;
  }

  /** Updates the names of the follower and followee, if it exists, given their handles are provided. */
  async updateFollow(withUpdatedFollowNames: Follow): Promise<void> {
    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: this.generateFollowKey(withUpdatedFollowNames),
      UpdateExpression: `set ${this.followeeNameAttr} = :fee, ${this.followerNameAttr} = :fer`,
      ExpressionAttributeValues: {
        ":fee": withUpdatedFollowNames.followee_name,
        ":fer": withUpdatedFollowNames.follower_name,
      },
      ReturnValues: "NONE",
    });

    const response = await this.client.send(command);
    this.logResponseOnError(response);
  }

  /** Deletes the indicated "follow" relationship, if it exists. */
  async deleteFollow(followHandles: FollowHandles): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: this.generateFollowKey(followHandles),
      ReturnValues: "NONE",
    });

    const response = await this.client.send(command);
    this.logResponseOnError(response);
  }

  private readFollow(item: Record<string, any>): Follow {
    return item as Follow; // Easy for now because the `Follow` interface exactly matches the database.
  }

  private generateFollowKey(followHandles: FollowHandles): Record<string, any> {
    return {
      [this.followerHandleAttr]: followHandles.follower_handle,
      [this.followeeHandleAttr]: followHandles.followee_handle,
    };
  }

  private logResponseOnError(response: MetadataBearer): void {
    const statusCategory = Math.floor(response.$metadata.httpStatusCode / 100);
    if (statusCategory === 2) return;
    console.warn("Received non-200 status code:", response);
  }

}
