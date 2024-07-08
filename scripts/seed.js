const { db } = require('@vercel/postgres');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // postgreSQL은 ON UPDATE CURRENT_TIMESTAMP가 동작 안 함
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone VARCHAR(20) NOT NULL,
        birthday CHAR(8) NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // client.sql`${변수}`로 할당하면 에러 발생함
    await client.sql`
      CREATE OR REPLACE FUNCTION update_timestamp()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `;
    await client.sql`
      CREATE TRIGGER trigger_update_timestamp
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION update_timestamp();
    `;

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding users: ', error);
    throw error;
  }
}

async function seedPosts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS posts(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        content TEXT NOT NULL,
        views INT DEFAULT 0,
        tags TEXT[],
        created_by_user_id UUID NOT NULL,
        FOREIGN KEY (created_by_user_id) REFERENCES users (id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await client.sql`
      CREATE OR REPLACE FUNCTION update_timestamp()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `;
    await client.sql`
      CREATE TRIGGER trigger_update_timestamp
      BEFORE UPDATE ON posts
      FOR EACH ROW
      EXECUTE FUNCTION update_timestamp();
    `;

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding posts: ', error);
    throw error;
  }
}

async function seedPostMedia(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    /**
     * BYTA: 바이너리 데이터 저장을 위한 형식
     * 용도: 이미지, 동영상, 오디오 파일 등의 바이너리 데이터를 저장할 수 있음
     * 저장 방식: PostgreSQL은 BYTEA 데이터를 바이너리 형식으로 저장하며, 입력된 데이터 그대로를 저장
     * 크기 제한: 최대 1GB까지 저장할 수 있지만, 일반적으로 데이터베이스에서는 큰 파일을 저장하는 것은 권장 X
     * 읽기 및 쓰기: 데이터베이스에 저장된 BYTEA 데이터는 읽기 및 쓰기가 가능
     */
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS post_media (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        post_id UUID NOT NULL,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
        media_file BYTEA,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await client.sql`
      CREATE OR REPLACE FUNCTION update_timestamp()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `;
    await client.sql`
      CREATE TRIGGER trigger_update_timestamp
      BEFORE UPDATE ON post_media
      FOR EACH ROW
      EXECUTE FUNCTION update_timestamp();
    `;

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding postMedia: ', error);
    throw error;
  }
}

async function seedTags(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS tags (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL
      )
    `;

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding tags: ', error);
    throw error;
  }
}

async function seedPostTags(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS post_tags (
        post_id UUID,
        tag_id UUID,
        PRIMARY KEY(post_id, tag_id),
        FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
      )
    `;

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding postTags: ', error);
    throw error;
  }
}

async function seedFollowers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS followers(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        followed_user_id UUID NOT NULL,
        following_user_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (followed_user_id, following_user_id),
        FOREIGN KEY (followed_user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (following_user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `;

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding followers: ', error);
    throw error;
  }
}

async function seedComments(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS comments(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        comment TEXT NOT NULL,
        created_by_user_id UUID NOT NULL,
        FOREIGN KEY (created_by_user_id) REFERENCES users (id) ON DELETE CASCADE,
        post_id UUID NOT NULL,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
        comment_replied_to_id UUID,
        FOREIGN KEY (comment_replied_to_id) REFERENCES comments (id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await client.sql`
      CREATE OR REPLACE FUNCTION update_timestamp()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `;
    await client.sql`
      CREATE TRIGGER trigger_update_timestamp
      BEFORE UPDATE ON comments
      FOR EACH ROW
      EXECUTE FUNCTION update_timestamp();
    `;

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding comments: ', error);
    throw error;
  }
}

async function seedReactions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS reactions(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        post_id UUID NOT NULL,
        reaction_type VARCHAR(20) NOT NULL,
        UNIQUE (user_id, post_id, reaction_type),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
      )
    `;

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding reactions: ', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedPosts(client);
  await seedPostMedia(client);
  await seedTags(client);
  await seedPostTags(client);

  await seedComments(client);

  await seedFollowers(client);
  await seedReactions(client);
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err
  );
});
