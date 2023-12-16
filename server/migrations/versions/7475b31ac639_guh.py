"""guh

Revision ID: 7475b31ac639
Revises: 12c5c5ebf51b
Create Date: 2023-12-15 03:10:49.762243

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7475b31ac639'
down_revision = '12c5c5ebf51b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('_alembic_tmp_friends')
    with op.batch_alter_table('friends', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id_1', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('user_id_2', sa.Integer(), nullable=True))
        batch_op.alter_column('status',
               existing_type=sa.VARCHAR(length=20),
               type_=sa.Enum('REQ_1', 'REQ_2', 'FRIEND', name='friendenum'),
               nullable=True)
        batch_op.drop_constraint('fk_friends_user_id_users', type_='foreignkey')
        batch_op.drop_constraint('fk_friends_friend_id_users', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_friends_user_id_2_users'), 'users', ['user_id_2'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_friends_user_id_1_users'), 'users', ['user_id_1'], ['id'])
        batch_op.drop_column('user_id')
        batch_op.drop_column('friend_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('friends', schema=None) as batch_op:
        batch_op.add_column(sa.Column('friend_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), nullable=True))
        batch_op.drop_constraint(batch_op.f('fk_friends_user_id_1_users'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_friends_user_id_2_users'), type_='foreignkey')
        batch_op.create_foreign_key('fk_friends_friend_id_users', 'users', ['friend_id'], ['id'])
        batch_op.create_foreign_key('fk_friends_user_id_users', 'users', ['user_id'], ['id'])
        batch_op.alter_column('status',
               existing_type=sa.Enum('REQ_1', 'REQ_2', 'FRIEND', name='friendenum'),
               type_=sa.VARCHAR(length=20),
               nullable=False)
        batch_op.drop_column('user_id_2')
        batch_op.drop_column('user_id_1')

    op.create_table('_alembic_tmp_friends',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('status', sa.VARCHAR(length=6), nullable=True),
    sa.Column('user_id_1', sa.INTEGER(), nullable=True),
    sa.Column('user_id_2', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['user_id_1'], ['users.id'], name='fk_friends_user_id_1_users'),
    sa.ForeignKeyConstraint(['user_id_2'], ['users.id'], name='fk_friends_user_id_2_users'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###