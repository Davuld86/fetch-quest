"""better category schema

Revision ID: 0abe62d0bccb
Revises: 0518e29bd586
Create Date: 2023-11-23 00:18:52.554897

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0abe62d0bccb'
down_revision = '0518e29bd586'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('categories_association',
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.Column('game_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], name=op.f('fk_categories_association_category_id_categories')),
    sa.ForeignKeyConstraint(['game_id'], ['games.id'], name=op.f('fk_categories_association_game_id_games')),
    sa.PrimaryKeyConstraint('category_id', 'game_id')
    )
    op.drop_table('category')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('category',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=True),
    sa.Column('game_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['game_id'], ['games.id'], name='fk_category_game_id_games'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('categories_association')
    op.drop_table('categories')
    # ### end Alembic commands ###